<template>
  <div id="chat-wrapper" class="page-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: 'chatRoom' }">房间列表</el-breadcrumb-item>
      <el-breadcrumb-item>聊天页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-container">
      <div class="user-con">
        <div>房间成员：</div>
        <ul>
          <li v-for="user in users" :key="user.id" class="user-item">
            <img :src="user.avatarURL">
            <span>{{user.name}}</span>
          </li>
        </ul>
        <input placeholder="enter user account" v-model="joinUserId">
        <button class="join-btn" @click="joinRoom">邀请加入房间</button>
      </div>
      <div class="chat-content">
        <div class="chat-content-hd">{{curRoom.name}}</div>
        <div class="chat-content-bd" ref="scrollView">
          <ul>
            <li
              v-for="(message, index) in messages"
              :key="index"
              :class="message.senderId===userId ? 'chat-message-right':'chat-message-left'"
            >
              <!-- 用户头像 -->
              <img class="chat-avatar" :src="userAvatars[message.senderId]">
              <!-- 用户昵称 -->
              <div class="chat-message">
                <p class="chat-name">{{userNames[message.senderId]}}</p>
                <!-- 内容 -->
                <p v-if="message.text" class="chat-text">{{message.text}}</p>
                <!-- 图片 -->
                <img v-else-if="message.attachment" class="chat-image" :src="message.attachment">
                <!-- 系统消息 -->
                <!-- <span v-else-if="message.type==='3'" class="chat-system-text">{{message.content}}</span> -->
                <!-- 未知对象 -->
                <!-- <span v-else class="chat-unknow-text">{{message.content}}</span> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="chat-content-ft">
          <input placeholder="enter your mseeage ..." v-model="message">
          <button @click="clickSendMessage">send message</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import robot from "@/utils/robot";
export default {
  data() {
    return {
      messages: [],
      message: "",
      isRobotRoom: false,
      curRoom: {},
      joinUserId: "",
      users: []
    };
  },
  computed: {
    ...mapGetters(["user"]),
    currentUser() {
      return this.user.chatUser;
    },
    userId() {
      return this.user.userInfo.id;
    },
    userAvatars() {
      const avatars = {};
      let user = {};
      const len = this.users.length;
      for (let i = 0; i < len; i++) {
        user = this.users[i];
        avatars[user.id] = user.avatarURL;
      }
      return avatars;
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
  filters: {},
  created() {
    this.curRoom = this.$route.params.room || {};
    this.isRobotRoom =
      this.curRoom.customData && this.curRoom.customData.isRobotRoom;
    // 机器人聊天室，不接入chatkit，无聊天消息
    if (this.curRoom.id) {
      this.getMessage();
      this.currentUser
        .subscribeToRoom({
          roomId: this.curRoom.id,
          hooks: {
            onMessage: message => {
              const { id, senderId, attachment, text } = message;
              if (senderId !== this.userId) {
                // 自己发的消息，本地先发送
                this.messages.push({
                  senderId,
                  attachment, //attachment为图片地址，默认优先判断
                  text,
                  id
                });
              }
            },
            onUserJoined: () => {},
            onUserLeft: () => {}
          },
          messageLimit: 10
        })
        .then(room => {
          this.users = room.users;
          console.log(this.users);
        })
        .catch(err => console.log(err));
    }
  },
  methods: {
    getMessage() {
      if (this.isRobotRoom) {
        return;
      }
      this.currentUser
        .fetchMessages({
          roomId: this.curRoom.id,
          // initialId: 42,
          direction: "older",
          limit: 30
        })
        .then(messages => {
          this.messages = messages;
          this.viewToBottom();
          // do something with the messages
        })
        .catch(err => {
          console.log(`Error fetching messages: ${err}`);
        });
    },
    clickSendMessage() {
      if (this.isRobotRoom) {
        this.sendMessageToRobot();
      } else {
        this.sendMessage();
      }
    },
    sendMessageToRobot() {
      this.messages.push({
        senderId: this.userId,
        text: this.message
      });
      this.viewToBottom();
      // 机器人
      robot
        .receiveMessage(this.message)
        .then(res => {
          this.messages.push({
            text: res.text,
            senderId: "ROBOT"
          });
          this.viewToBottom();
        })
        .catch(() => {
          this.messages.push({
            text: "robot is gone!",
            type: "3"
          });
        });
      this.message = "";
    },
    sendMessage() {
      this.messages.push({
        senderId: this.userId,
        text: this.message
      });
      this.viewToBottom();
      this.currentUser
        .sendMessage({
          text: this.message,
          roomId: this.curRoom.id
        })
        .then((/*messageId*/) => {
          // console.log(`Added message to ${myRoom.name}`);
        })
        .catch(() => {
          // console.log(`Error adding message to ${myRoom.name}: ${err}`);
        });
      this.message = "";
    },
    sendImageMessage(imageUrl) {
      this.messages.push({
        senderId: this.userId,
        attachment: imageUrl
      });
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
    getAvatar(userId) {
      // debugger;
      const idx = this.users.findIndex(user => user.id === userId);
      if (idx > -1) {
        console.log(this.users[idx].avatarURL, "avatarURL");
        return this.users[idx].avatarURL;
      } else {
        return "";
      }
    }
  },
  beforeDestory() {
    this.curRoom.id &&
      this.currentUser.roomSubscriptions[this.curRoom.id].cancel();
  }
};
</script>

<style lang="scss" scoped>
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
  background-color: aliceblue;
  .chat-content-hd {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chat-content-bd {
    flex-grow: 1;
    max-height: 430px;
    min-height: 200px;
    overflow: auto;
    padding: 20px;
    ul li {
      display: flex;
      align-items: center;
      padding: 12px 0px;
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
    .chat-avatar {
      width: 50px;
      // margin-right: 16px;
      border-radius: 50%;
    }
  }
  .chat-content-ft {
    height: 40px;
    display: flex;
    padding: 6px 20px;
    input {
      flex: auto;
      padding-left: 8px;
    }
  }
}
</style>


