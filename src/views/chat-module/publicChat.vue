<template>
  <div id="chat-wrapper" class="page-container">
    <div class="main-container">
      <div class="user-con">
        <div>房间成员：</div>
        <ul>
          <li v-for="user in users" :key="user.id" class="user-item">
            <user-icon :uavator="user.avator" :uname="user.remark || user.name" :ubio="user.bio"></user-icon>
          </li>
        </ul>
      </div>
      <div class="chat-content">
        <div class="chat-content-hd">{{curRoom ? curRoom.name:''}}</div>
        <div class="chat-content-bd" ref="scrollView">
          <ul>
            <li v-for="(message, index) in messages" :key="index">
              <div
                class="message-con"
                :class="message.senderId===userId ? 'chat-message-right':'chat-message-left'"
                v-if="message.type==='image' || message.type==='text'"
              >
                <!-- 用户头像 -->
                <img class="chat-avatar" :src="userAvators[message.senderId]">
                <!-- 用户昵称 -->
                <div class="chat-message">
                  <span class="chat-name">{{userNames[message.senderId]}}</span>
                  <!-- 内容 -->
                  <pre v-if="message.type==='text'" class="chat-text chat-pre">{{message.content}}</pre>
                  <!-- 图片 -->
                  <img v-else class="chat-image" :src="message.content">
                </div>
              </div>
              <div class="other-message-con" v-else>
                <!-- 系统消息 -->
                <span v-if="message.type==='system'" class="chat-system-text">{{message.content}}</span>
                <!-- 未知对象 -->
                <span v-else class="chat-unknow-text">{{message.content}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="chat-ft">
          <div class="chat-toolbar">
            <div class="chat-icon-con">
              <i class="chat-icon el-icon-picture"></i>
              <label class="send-img-label">
                <input
                  class="send-img-input"
                  ref="fileInput"
                  type="file"
                  @change="selectImg($event)"
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                >
              </label>
            </div>
          </div>
          <div class="chat-input-con">
            <textarea class="chat-textarea" v-model="message"></textarea>
            <span class="chat-btn" @click="clickSendMessage"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import robot from "@/utils/robot";
import socket from "@/utils/socket";
import { onEvt, offEvt } from "@/utils/socketEvents";
/* global GLOBAL */
export default {
  data() {
    return {
      messages: [],
      message: "",
      curRoom: {},
      users: []
    };
  },
  computed: {
    ...mapGetters(["user"]),
    userInfo() {
      return this.user.userInfo || {};
    },
    userId() {
      return this.userInfo.id;
    },
    userAvators() {
      const avators = {};
      let user = {};
      const len = this.users.length;
      for (let i = 0; i < len; i++) {
        user = this.users[i];
        avators[user.id] = user.avator;
      }
      return avators;
    },
    userNames() {
      const names = {};
      let user = {};
      const len = this.users.length;
      for (let i = 0; i < len; i++) {
        user = this.users[i];
        names[user.id] = user.name;
      }
      return names;
    }
  },
  created() {
    this.curRoom = this.$route.params.room;
    if (!this.curRoom) {
      this.$router.push("chatRoom");
      return;
    }

    socket.emit("joinRoom", {
      user: this.user.userInfo,
      room: this.curRoom.name
    });

    onEvt("userJoin", user => {
      if (user.id !== this.userId) {
        // console.log(`${user.name}加入房间`);
        this.messages.push({
          content: `${user.name}加入房间`,
          type: "system"
        });
        this.users.push(user);
      }
    });
    // socket.on("userJoin", user => {
    //   console.log(`${user.name}加入房间`);
    //   this.users.push(user);
    // });
    onEvt("userLeave", user => {
      // console.log(`${user.name}离开房间`);
      this.messages.push({
        content: `${user.name}离开房间`,
        type: "system"
      });
      const idx = this.users.findIndex(item => {
        return item.id === user.id;
      });
      if (idx > -1) {
        this.users.splice(idx, 1);
      }
    });
    // socket.on("userLeave", user => {
    //   console.log(`${user.name}离开房间`);
    //   const idx = this.users.findIndex(item => {
    //     item.id === user.id;
    //   });
    //   if (idx > -1) {
    //     this.users.splice(idx, 1);
    //   }
    // });
    onEvt("roomUsers", users => {
      // console.log("roomUsers", users);
      this.users = users;
    });

    onEvt("message", message => {
      this.messages.push(message);
      this.viewToBottom();
    });
    GLOBAL.vbus.$on("user_offline", () => {
      this.userLeave();
    });
    // 机器人聊天室，不接入chatkit，无聊天消息
  },
  methods: {
    clickSendMessage() {
      if (!this.message) {
        return;
      }
      const isToRobot = this.message.match(/^@robot/);
      if (isToRobot) {
        this.sendMessageToRobot();
      } else {
        this.sendMessage();
      }
    },
    sendMessageToRobot() {
      this.messages.push({
        senderId: this.userId,
        content: this.message
      });
      this.viewToBottom();
      // 机器人
      robot
        .receiveMessage(this.message)
        .then(res => {
          this.messages.push({
            content: res.text,
            senderId: "ROBOT",
            type: "text"
          });
          this.viewToBottom();
        })
        .catch(() => {
          this.messages.push({
            content: "robot is gone!",
            type: "system"
          });
        });
      this.message = "";
    },
    sendMessage() {
      // this.messages.push({
      //   senderId: this.userId,
      //   text: this.message
      // });
      // this.viewToBottom();
      socket.emit("message", {
        user: this.user.userInfo,
        room: this.curRoom.name,
        message: {
          senderId: this.userId,
          content: this.message,
          type: "text"
        }
      });
      this.message = "";
    },
    selectImg(e) {
      const file = e.target.files[0];
      const filePath = this.$refs.fileInput.value;
      if (file) {
        const typeIdx = filePath.lastIndexOf(".");
        const fileType =
          typeIdx > -1
            ? filePath.substring(typeIdx + 1, filePath.length).toLowerCase()
            : "";
        //判断上传的附件是否为图片
        if (["jpg", "jpeg", "bmp", "png", "gif"].indexOf(fileType) < 0) {
          this.$message({
            message: "请选择图片格式！",
            type: "error"
          });
          this.$refs.fileInput.value = "";
          return;
        }
        // // 限制上传图片大小
        const fileSize = file.size / 1024;
        if (fileSize > 10240) {
          this.$message({
            message: "图片大小不能超过10MB！",
            type: "error"
          });
          this.$refs.fileInput.value = "";
          return;
        }

        // this.file = file;
        const reader = new FileReader();
        const that = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          // 这里的this 指向reader
          // that.updateItem.extra3 = this.result;
          that.$refs.fileInput.value = "";
          that.sendImageMessage(this.result);
        };
      }
      this.$refs.fileInput.value = "";
    },
    sendImageMessage(imageUrl) {
      socket.emit("message", {
        user: this.user.userInfo,
        room: this.curRoom.name,
        message: {
          senderId: this.userId,
          content: imageUrl,
          type: "image"
        }
      });

      // this.messages.push({
      //   senderId: this.userId,
      //   content: imageUrl,
      //   type: "image"
      // });
      // uploadImage req:image  res:image
    },
    viewToBottom() {
      this.$nextTick(() => {
        if (this.$refs.scrollView) {
          this.$refs.scrollView.scrollTop = this.$refs.scrollView.scrollHeight;
        }
      });
    },
    joinRoom() {
      this.currentUser
        .addUserToRoom({
          userId: this.joinUserId,
          roomId: this.curRoom.id
        })
        .then(room => {
          this.curRoom = room;
          // this.users = room.users;
        })
        .catch(() => {});
      this.joinUserId = "";
    },
    userLeave() {
      if (this.curRoom && this.user) {
        socket.emit("leaveRoom", {
          user: this.user.userInfo,
          room: this.curRoom.name
        });
      }
      offEvt("userJoin");
      offEvt("userLeave");
      offEvt("roomUsers");
      offEvt("message");
    }
  },
  beforeDestroy() {
    this.userLeave();
  }
};
</script>

<style lang="scss" scoped>
$assets_path: "../../assets/";
.breadcrumb {
  max-width: 1200px;
  margin: 10px auto 20px;
}
.main-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.join-btn {
  margin-top: 16px;
}
.user-con {
  margin-bottom: 20px;
  .user-item {
    padding: 2px 0px;
    display: flex;
    align-items: center;
    img {
      width: 30px;
      margin-right: 8px;
    }
  }
}
.chat-content {
  max-width: 750px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  // margin-top: 30px;
  display: flex;
  flex-direction: column;
  // background-color: aliceblue;
  .chat-content-hd {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .chat-content-bd {
    flex-grow: 1;
    max-height: 430px;
    min-height: 200px;
    overflow: auto;
    padding: 20px;
    .message-con {
      display: flex;
      align-items: center;
      padding: 12px 0px;
    }
    .other-message-con {
      text-align: center;
      padding: 6px 0px;
      font-size: 14px;
    }
    .chat-message-left {
      .chat-text::before {
        left: -20px;
        border-right-color: #91d98a;
      }
    }
    .chat-message-right {
      flex-direction: row-reverse;
      .chat-text::before {
        right: -20px;
        border-left-color: #91d98a;
      }
      .chat-name {
        text-align: right;
      }
    }
    .chat-message {
      margin: 0 16px;
      display: flex;
      flex-direction: column;
    }
    .chat-name {
      margin: 0px;
      font-size: 12px;
    }
    .chat-text {
      position: relative;
      background-color: #91d98a;
      border-radius: 4px;
      padding: 10px 20px;
      margin: 0px;
      color: #fff;
      &::before {
        content: " ";
        display: block;
        width: 0;
        height: 0;
        border: 12px solid transparent;
        top: 8px;
        position: absolute;
        z-index: 2;
      }
    }
    .chat-pre {
      margin: 0;
      font-family: inherit;
      font-size: inherit;
      white-space: pre-wrap;
      word-break: normal;
    }
    .chat-image {
      cursor: pointer;
      // max-width: 350px;
      // max-width: 50%;
      // height: 240px;
      max-height: 240px;
      // margin-right: 16px;
    }
    .chat-avatar {
      width: 50px;
      // margin-right: 16px;
      border-radius: 50%;
    }
  }
  // .chat-content-ft {
  //   height: 40px;
  //   display: flex;
  //   padding: 6px 20px;
  //   input {
  //     flex: auto;
  //     padding-left: 8px;
  //   }
  // }
  .chat-ft {
    border-top: 1px solid #e6e6e6;
    margin-top: 12px;
    .chat-toolbar {
      display: flex;
      .chat-icon-con {
        width: 20px;
        height: 20px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        margin-left: 16px;
        margin-top: 8px;
        .chat-icon {
          width: 100%;
          height: 100%;
        }
        .send-img-label {
          position: absolute;
          top: 0px;
          left: 0px;
          height: 100%;
          width: 100%;
          cursor: pointer;
          opacity: 0;
        }
        .send-img-input {
          display: none;
        }
      }
    }
    .chat-input-con {
      .send-img-con {
        width: 30px;
        height: 30px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        margin-right: 8px;
        .chat-icon {
          width: 95%;
          height: 95%;
        }
        .send-img-label {
          position: absolute;
          top: 0px;
          left: 0px;
          height: 100%;
          width: 100%;
          cursor: pointer;
          opacity: 0;
        }
        .send-img-input {
          display: none;
        }
      }
      // padding: 5px 0;
      // border-top: 1px solid #e6e6e6;
      // margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin-top: 16px;
      padding: 8px;
      // background-color: #f3f5f9;
      // border: 1px solid #e6e6e6;
    }
    .chat-input {
      height: 40px;
      line-height: 40px;
      // flex-grow: .8;
      flex-grow: 1;
      padding-left: 12px;
      padding-right: 12px;
      &:focus {
        outline: none;
      }
    }
    .chat-textarea {
      max-height: 80px;
      overflow-y: auto;
      overflow-x: hidden;
      flex-grow: 1;
      padding-left: 12px;
      padding-right: 12px;
      &:focus {
        outline: none;
      }
      resize: none;
    }
    // .chat-btn {
    //     cursor: pointer;
    //     padding: 4px 10px;
    //     background-color: #f3f5f9;
    // }
    .chat-btn {
      background: url($assets_path+"images/send.png") no-repeat;
      background-size: auto 100%;
      width: 30px;
      height: 30px;
      margin-left: 16px;
    }
  }
}
</style>


