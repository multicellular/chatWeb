<template>
  <div class="page-container">
    <div class="main-container">
      <div class="my-rooms-con">
        <div class="con-title">我的群聊:</div>
        <ul class="rooms">
          <li v-for="room in rooms" :key="room.id" @click="goRoomChat(room)">
            <span class="room-name">{{room.name}}</span>
          </li>
        </ul>
      </div>
      <div class="my-friends-con">
        <div class="con-title">好友列表:</div>
        <ul class="friends">
          <li class="friend" v-for="user in friends" :key="user.id" @click="goUserChat(user)">
            <div class="avatar-con">
              <img class="user-avatar" :src="user.uavator">
            </div>
            <div>
              <span class="user-name">{{user.uremark || user.uname}}</span>
              <span class="user-bio">{{user.ubio}}</span>
            </div>
          </li>
        </ul>
        <div class="create-btn-con">
          <input placeholder="输入用户名称" v-model="joinUserName">
          <!-- 搜索用户姓名，加载对应用户或用户列表，输入申请好友验证信息，发送申请等待验证。 -->
          <button @click="clickJoinFriend">添加好友</button>
        </div>
      </div>
      <div class="public-rooms-con">
        <div class="con-title">公共房间</div>
        <ul class="rooms">
          <!-- 公共房间人员列表不入库，人员列表友socket.io广播通知 -->
          <li v-for="room in publicRooms" :key="room.id">
            <span class="room-name">{{room.name}}</span>
            <span class="room-desc">{{room.desc}}</span>
            <button class="join-room-btn" @click="goPublicChat(room)">加入房间</button>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="isShowJoinUsers" :title="'Join users'">
      <div>
        <ul>
          <li v-for="user in joinUsers" :key="user.id" @click="clickApply(user)">
            <span>{{user.uname}}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isShowApply" :title="'apply message'">
      <div>
        <input v-model="verify_message">
        <button @click="apply">申请</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import robot from "@/utils/robot";
// import getChatManager from "@/utils/chatkit";
import * as roomApi from "@/api/chat";
export default {
  data() {
    return {
      rooms: [],
      friends: [],
      friendRoom: {},
      publicRooms: [],
      joinUserName: "",
      isShowJoinUsers: false,
      joinUsers: [],
      applyUser: {},
      isShowApply: false,
      verify_message: ""
    };
  },
  computed: {
    ...mapGetters(["user"]),
    userId() {
      return this.user.userInfo.id;
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      roomApi.getUserRoomsApi(this.userId).then(({ rooms }) => {
        this.rooms = rooms;
      });
      roomApi
        .getUserFriendsApi(this.userId)
        .then(({ friend_room, friends }) => {
          this.friends = friends;
          this.friendRoom = friend_room;
        });
      roomApi.getPublicRoomsApi().then(({ rooms }) => {
        this.publicRooms = rooms;
      });
    },
    createRoom() {},
    goRoomChat(room) {
      this.$router.push({
        // path: "chat",
        name: "groupChat",
        params: {
          room,
          isRoom: true
        }
      });
    },
    goUserChat(user) {
      if (user.id === this.userId) {
        return;
      }
      this.$router.push({
        // path: "chat",
        name: "groupChat",
        params: {
          user
        }
      });
    },
    goPublicChat(room) {
      this.$router.push({
        // path: "chat",
        name: "publicChat",
        params: {
          room
        }
      });
    },
    clickJoinFriend() {
      this.isShowJoinUsers = true;
      roomApi
        .searchUsersByNameApi({
          uname: this.joinUserName
        })
        .then(res => {
          if (res.code === 0) {
            this.joinUsers = res.users;
          }
        });
    },
    clickApply(user) {
      this.applyUser = user;
      this.verify_message = this.user.userInfo.name;
      this.isShowApply = true;
    },
    apply() {
      // { verify_message, apply_uid, apply_flist_id, invitees_uid, invitees_flist_id }
      roomApi
        .createApplyApi({
          verify_message: this.verify_message,
          apply_uid: this.userId,
          apply_flist_id: this.friendRoom.id,
          invitees_uid: this.applyUser.uid,
          invitees_flist_id: this.applyUser.flist_id
        })
        .then(({ code }) => {
          if (code === 0) {
            this.$message("申请已发送！");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  .my-rooms-con {
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 20px;
    .create-btn-con {
      margin-top: 12px;
    }
  }
  .public-rooms-con {
    padding: 20px;
    margin-top: 24px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  .my-friends-con {
    .friend {
      display: flex;
      align-items: center;
      .avatar-con {
        margin-right: 12px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        .user-avatar {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .user-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2e3135;
      }
      .user-bio {
        font-size: 13px;
        color: #8a9aa9;
      }
    }
  }
  .rooms {
    display: flex;
    flex-direction: column;
    li {
      padding: 2px 0px;

      margin: 2px 0px;
      .room-name {
        margin-right: 12px;
      }
    }
  }
}
</style>


