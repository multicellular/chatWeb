<template>
  <div id="chat-wrapper" class="page-container">
    <div class="main-container" :class="{'mobile-main-container':isMobile}">
      <div class="my-rooms-con" v-show="!isShowMobileChat">
        <!-- <div class="con-title">聊天列表</div> -->
        <ul class="rooms">
          <li
            class="room"
            v-for="(room,index) in chatRooms"
            :class="{selected:curIndex===index}"
            :key="index"
            @click="selectRoom(index)"
          >
            <div class="room-avator">
              <img
                class="avator-image"
                :style="{width: room.avators.length === 1 ? '100%' : room.avators.length ===2 ? '50%': '33%',
                'height': room.avators.length === 1 ? '100%' : room.avators.length ===2 ? '50%': '33%'}"
                v-for="(avator,index) in room.avators.slice(0,9)"
                :key="index"
                :src="avator"
              >
            </div>
            <div class="room-name">{{room.name}}</div>
          </li>
        </ul>
      </div>
      <div class="chat-content" v-if="!isMobile">
        <div class="chat-content-hd">
          <span>{{curRoom && curRoom.name}}</span>
          <div class="chat-users-con">
            <button class="show-users-btn" @click="isShowChatUsers=!isShowChatUsers">好友列表</button>
            <div class="chat-users" v-if="isShowChatUsers">
              <div>房间成员：</div>
              <ul>
                <li class="user-item" v-for="user in chatUsers" :key="user.id">
                  <img class="user-item-avator" :src="user.uavator" width="25" height="25">
                  <span class="user-item-name">{{user.uname}}</span>
                  <!-- <user-icon :uavator="user.uavator" :uname="user.uname"></user-icon> -->
                </li>
              </ul>
              <i class="el-icon-circle-plus-outline join-btn" @click="clickJoinRoom"></i>
              <!-- <button class="join-btn" @click="clickJoinRoom">邀请加入房间</button> -->
            </div>
          </div>
        </div>
        <div class="chat-content-bd" ref="scrollView">
          <ul>
            <li
              v-for="(message, index) in curRoomMessages"
              :key="index"
              :class="message.sendid===userId ? 'chat-message-right':'chat-message-left'"
            >
              <!-- 用户头像 -->
              <img class="chat-avatar" :src="userAvatars[message.sendid]">
              <!-- 用户昵称 -->
              <div class="chat-message">
                <p class="chat-name">{{userNames[message.sendid]}}</p>
                <!-- 内容 -->
                <p v-if="message.type==='text'" class="chat-text">{{message.content}}</p>
                <!-- 图片 -->
                <img v-else-if="message.type==='image'" class="chat-image" :src="message.content">
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
    <el-dialog
      :visible.sync="isShowMobileChat"
      fullscreen
      v-if="isMobile"
      class="mobile-fullscreen"
    >
      <div class="chat-content mobile-chat-content">
        <div class="chat-content-hd">
          <i class="el-icon-back" @click="isShowMobileChat=false">返回</i>
          <span class="chat-name">{{curRoom && curRoom.name}}</span>
          <div class="chat-users-con">
            <i class="el-icon-more show-users-btn" @click="isShowChatUsers=!isShowChatUsers"></i>
            <!-- <button class="show-users-btn" @click="isShowChatUsers=!isShowChatUsers">好友列表</button> -->
            <div class="chat-users" v-if="isShowChatUsers">
              <div>房间成员：</div>
              <ul>
                <li class="user-item" v-for="user in chatUsers" :key="user.id">
                  <img class="user-item-avator" :src="user.uavator" width="25" height="25">
                  <span class="user-item-name">{{user.uname}}</span>
                  <!-- <user-icon :uavator="user.uavator" :uname="user.uname"></user-icon> -->
                </li>
              </ul>
              <i class="el-icon-circle-plus-outline join-btn" @click="clickJoinRoom"></i>
              <!-- <button class="join-btn" @click="clickJoinRoom">邀请加入房间</button> -->
            </div>
          </div>
        </div>
        <div class="chat-content-bd" ref="scrollView">
          <ul>
            <li
              v-for="(message, index) in curRoomMessages"
              :key="index"
              :class="message.sendid===userId ? 'chat-message-right':'chat-message-left'"
            >
              <!-- 用户头像 -->
              <img class="chat-avatar" :src="userAvatars[message.sendid]">
              <!-- 用户昵称 -->
              <div class="chat-message">
                <p class="chat-name">{{userNames[message.sendid]}}</p>
                <!-- 内容 -->
                <p v-if="message.type='text'" class="chat-text">{{message.content}}</p>
                <!-- 图片 -->
                <img v-else-if="message.type='image'" class="chat-image" :src="message.content">
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
    </el-dialog>
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
            <!-- <span>{{user.uname}}</span> -->
            <user-icon :uavator="user.uavator" :uname="user.uname" :ubio="user.ubio"></user-icon>
            <icon-svg iconClass="selected" class="select-icon" v-if="joinIds.indexOf(user.uid)>-1"></icon-svg>
          </li>
        </ul>
        <el-button type="primary" :loading="joinLoading" @click="joinRoom">加入群聊</el-button>
        <!-- <button @click="joinRoom">加入群聊</button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as roomApi from "@/api/chat";
import Web_Socket from "@/utils/webSocket";
export default {
  data() {
    return {
      messages: [],
      message: "",
      isShowJoin: false,
      userFriends: [],
      joinIds: [],
      chatRooms: [],
      curIndex: 0,
      isShowChatUsers: false,
      joinLoading: false,
      isShowMobileChat: false,
      web_socket: null
    };
  },
  computed: {
    ...mapGetters(["user"]),
    userInfo() {
      return this.user.userInfo || {};
    },
    userId() {
      return this.userInfo.id || {};
    },
    chatIds() {
      let ids = [];
      for (let i = 0; i < this.chatUsers.length; i++) {
        ids.push(this.chatUsers[i].uid);
      }
      return ids;
    },
    curRoom() {
      return this.chatRooms[this.curIndex] || {};
    },
    chatUsers() {
      return this.curRoom.room_users || [];
    },
    isMobile() {
      return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    },
    userAvatars() {
      const avators = {};
      let user = {};
      const len = this.chatUsers.length;
      for (let i = 0; i < len; i++) {
        user = this.chatUsers[i];
        avators[user.uid] = user.uavator;
      }
      return avators;
    },
    userNames() {
      const names = {};
      let user = {};
      const len = this.chatUsers.length;
      for (let i = 0; i < len; i++) {
        user = this.chatUsers[i];
        names[user.uid] = user.uname;
      }
      return names;
    },
    curRoomMessages() {
      return this.messages.filter(message => {
        return message.roomid == this.curRoom.id;
      });
    }
  },
  created() {
    const curRoomId = this.$route.params.roomId;
    this.initRooms(curRoomId);
  },
  methods: {
    initRooms(curRoomId) {
      Promise.all([
        roomApi.getUserRoomsApi(this.userId),
        roomApi.getUserChatsApi(this.userId)
      ]).then(([{ rooms }, { chats }]) => {
        this.chatRooms = chats.concat(rooms);
        const index = this.chatRooms.findIndex(room => {
          // return room.id === curRoomId && room.isChat===curRoomIsChat;
          return room.id === curRoomId && room.isChat;
        });
        if (index > -1) {
          this.selectRoom(index);
        }
      });
    },
    selectRoom(index) {
      this.curIndex = index;
      if (this.isMobile) {
        this.isShowMobileChat = true;
        this.isShowChatUsers = false;
      }
      if (this.web_socket) {
        this.web_socket.close();
      }
      this.web_socket = new Web_Socket(
        `/chat/${this.curRoom.id}/${this.userId}`
      ).getWebSocket();
      setTimeout(() => {
        this.web_socket.send("join");
        this.web_socket.onmessage = message => {
          console.log(message);
          var msg = JSON.parse(message.data);
          this.messages.push(msg);
        };
      }, 1000);
    },
    getUserFriends() {
      if (this.userFriends && this.userFriends.length > 0) {
        return;
      }
      roomApi.getUserFriendsApi(this.userId).then(({ friends }) => {
        this.userFriends = friends;
      });
    },
    clickJoinRoom() {
      this.isShowJoin = true;
      this.joinLoading = false;
      this.joinIds = [];
      this.getUserFriends();
    },
    joinRoom() {
      if (!this.joinIds || this.joinIds.length < 1) {
        return;
      }
      this.joinLoading = true;
      if (this.curRoom.isChat) {
        // 两人聊天室变成全聊房间,当前房间变更
        // const names = this.chatNames.concat(this.joinNames);
        const ids = this.chatIds.concat(this.joinIds); // 首次创建房间，原两人聊天室两人加入
        roomApi
          .createRoomApi({
            name: "",
            desc: "",
            ownerid: this.userId
          })
          .then(res => {
            const room = res.room;
            roomApi
              .inviteRoomUsersApi({
                roomid: room.id,
                uids: ids
              })
              .then(({ users, room }) => {
                room.room_users = users;
                let names = [];
                let avators = [];
                for (let user of users) {
                  names.push(user.uname);
                  avators.push(user.uavator);
                }
                room.avators = avators;
                if (!room.name) {
                  room.name = names.join(",");
                }
                room.room_users = users;
                this.chatRooms.unshift(room);
                this.curIndex = 0;
                this.isShowJoin = false;
                // this.changeCurRoom(room, 0);
              });
          });
      } else {
        roomApi
          .inviteRoomUsersApi({
            roomid: this.curRoom.id,
            uids: this.joinIds
          })
          .then(({ users, room }) => {
            room.room_users = users;
            let names = [];
            let avators = [];
            for (let user of users) {
              names.push(user.uname);
              avators.push(user.uavator);
            }
            room.avators = avators;
            if (!room.name) {
              room.name = names.join(",");
            }
            this.chatRooms[this.curIndex] = room;
            this.isShowJoin = false;
          });
      }
    },
    selectUser(user) {
      if (this.chatIds.indexOf(user.uid) > -1) {
        // 选择了已经在列表中的数据
        return;
      }
      const idx = this.joinIds.indexOf(user.uid);
      if (idx > -1) {
        // 再次点击去除选中
        this.joinIds.splice(idx, 1);
      } else {
        this.joinIds.push(user.uid);
      }
    },
    getMessage() {},
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
.page-container {
  height: 84vh;
}
.main-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  // flex-wrap: wrap;
}

.mobile-fullscreen {
  .mobile-chat-content {
    width: auto;
    min-width: auto;
    height: 100%;
    .chat-content-bd {
      min-height: auto;
      max-height: none;
    }
  }
}
.mobile-main-container {
  .my-rooms-con {
    height: 100%;
  }
}

.my-rooms-con {
  // width: 30%;
  height: 95%;
  overflow-x: hidden;
  // overflow-y: auto;
  .rooms {
    display: flex;
    flex-direction: column;
    .room {
      padding: 6px;
      margin: 2px 0px;
      border: 1px solid #aaa;
      display: flex;
      height: 70px;
      overflow: hidden;
      align-items: center;
      .room-name {
        margin-right: 2px;
        margin-left: 12px;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 2;
        white-space: nowrap;
      }
      .room-avator {
        min-width: 60px;
        width: 60px;
        height: 60px;
        display: flex;
        flex-wrap: wrap;
        border-radius: 4px;
        background-color: #ececec;
        padding: 1px;
        .avator-image {
          padding: 1px;
        }
      }
    }
  }
  .create-btn-con {
    margin-top: 12px;
  }
  .room.selected {
    background-color: #d8dad9;
  }
}

.friends-con {
  .unSelect {
    opacity: 0.7;
  }
  .friend {
    display: flex;
    align-items: center;
    margin: 6px 0px;
    .select-icon {
      margin-left: 12px;
    }
  }
}

.chat-content {
  // max-width: 750px;
  width: 70%;
  min-width: 70%;
  height: 95%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  // margin-top: 30px;
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  .chat-content-hd {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    background-color: #fff;
    .el-icon-back {
      white-space: nowrap;
    }
    .chat-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0px 40px;
    }
    .chat-users-con {
      position: relative;
      .show-users-btn {
        margin-right: 20px;
      }
      .chat-users {
        background-color: #fff;
        position: absolute;
        right: 0px;
        padding: 10px 20px;
        width: 200px;
        .user-item {
          display: flex;
          align-items: center;
          margin: 8px 0px;
          .user-item-avator {
            width: 25px;
            max-height: 25px;
            margin-right: 8px;
          }
          .user-item-name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
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
    background-color: #fff;
    input {
      flex: auto;
      padding-left: 8px;
    }
  }
}
</style>


