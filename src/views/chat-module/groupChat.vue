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
          <li v-for="user in chatUsers" :key="user.id" class="user-item">
            <img :src="user.uavator">
            <span>{{user.uname}}</span>
          </li>
        </ul>
        <button class="join-btn" @click="clickJoinRoom">邀请加入房间</button>
      </div>
      <div class="chat-content">
        <div class="chat-content-hd">{{chatObj && (chatObj.name || chatObj.uname )}}</div>
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
    <el-dialog :visible.sync="isShowJoin" :title="'Join Room'">
      <div class="friends-con">
        <ul class="friends">
          <li
            class="friend"
            v-for="user in userFriends"
            :key="user.id"
            :class="{unSelect:chatIds.indexOf(user.uid)>-1}"
            @click="selectUser(user)"
          >
            <span>{{user.uname}}</span>
            <icon-svg iconClass="selected" v-if="joinIds.indexOf(user.uid)>-1"></icon-svg>
          </li>
        </ul>
        <button @click="joinRoom">加入群聊</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as roomApi from "@/api/chat";
export default {
  data() {
    return {
      messages: [],
      message: "",
      isShowJoin: false,
      userFriends: [],
      joinIds: [],
      chatUsers: [],
      isRoom: [],
      chatObj: {}
    };
  },
  computed: {
    ...mapGetters(["user"]),
    userInfo() {
      return this.user.userInfo || {};
    },
    chatIds() {
      let ids = [];
      for (let i = 0; i < this.chatUsers.length; i++) {
        ids.push(this.chatUsers[i].uid);
      }
      return ids;
    }
  },
  created() {
    this.isRoom = this.$route.params.isRoom;
    this.chatObj = this.$route.params.room || this.$route.params.user;
    if (!this.chatObj) {
      this.$router.push("/chat");
      return;
    }
    if (this.isRoom) {
      this.initRoom(this.chatObj.id);
    } else {
      this.chatUsers = [
        {
          uid: this.userInfo.id,
          uname: this.userInfo.name,
          uavator: this.userInfo.avator
        },
        {
          uid: this.chatObj.uid,
          uname: this.chatObj.uname,
          uavator: this.chatObj.uavator
        }
      ];
    }
  },
  methods: {
    initRoom(roomid) {
      roomApi.getRoomUsersApi(roomid).then(({ users }) => {
        this.chatUsers = users;
      });
    },
    getUserFriends() {
      if (this.userFriends && this.userFriends.length > 0) {
        return;
      }
      roomApi.getUserFriendsApi(this.userInfo.id).then(({ friends }) => {
        this.userFriends = friends;
      });
    },
    getMessage() {},
    clickJoinRoom() {
      this.isShowJoin = true;
      this.getUserFriends();
    },
    joinRoom() {
      if (!this.joinIds || this.joinIds.length < 1) {
        return;
      }
      if (this.isRoom) {
        roomApi
          .inviteRoomUsersApi({
            roomid: this.chatObj.id,
            uids: this.joinIds
          })
          .then(res => {
            this.chatUsers = res.users;
          });
      } else {
        roomApi
          .createRoomApi({
            name: "群聊...",
            desc: "",
            ownerid: this.userInfo.id
          })
          .then(res => {
            const room = res.room;
            this.isRoom = true;
            this.chatObj = room;
            roomApi
              .inviteRoomUsersApi({
                roomid: room.id,
                uids: this.joinIds
              })
              .then(res => {
                this.chatUsers = res.users;
              });
          });
      }
    },
    selectUser(user) {
      if (this.chatIds.indexOf(user.uid) > -1) {
        return;
      }
      this.joinIds.push(user.uid);
    },
    clickSendMessage() {
      this.sendMessage();
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
    }
  },
  beforeDestory() {}
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
.friends-con {
  .unSelect {
    opacity: 0.8;
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


