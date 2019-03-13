<template>
  <div class="page-container">
    <div class="main-container">
      <div class="my-friends-con">
        <div class="con-title">好友列表:</div>
        <ul class="friends">
          <li
            class="friend"
            v-for="friend in friends"
            :key="friend.uid"
            @click="joinGroupChat(friend)"
          >
            <user-icon
              :uavator="friend.uavator"
              :uname="friend.uremark || friend.uname"
              :ubio="friend.ubio"
            ></user-icon>
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
            <div>
              <div class="room-name">{{room.name}}</div>
              <div class="room-desc">{{room.caption}}</div>
            </div>
            <button class="join-room-btn" @click="goPublicChat(room)">加入房间</button>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="isShowJoinUsers" :title="'Join users'">
      <div>
        <ul>
          <li v-for="user in joinUsers" :key="user.id" @click="clickApply(user)">
            <user-icon :uavator="user.uavator" :uname="user.uname" :ubio="user.ubio"></user-icon>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isShowApply" :title="'apply message'">
      <div>
        <span>
          验证消息：
          <input v-model="verify_message">
        </span>
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
    goGroupChat(room) {
      this.$router.push({
        // path: "chat",
        name: "groupChat",
        params: {
          roomId: room.id
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
          this.joinUsers = res.users;
        });
    },
    clickApply(user) {
      this.applyUser = user;
      this.verify_message = "我是" + this.user.userInfo.name;
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
        .then(() => {
          this.$message("申请已发送！");
          this.isShowApply = false;
        });
    },
    joinGroupChat(friend) {
      roomApi
        .createChatApi({
          uid: this.userId,
          fuid: friend.uid
        })
        .then(({ chat }) => {
          this.goGroupChat(chat);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  height: 84vh;
}
.main-container {
  height: 100%;
  .public-rooms-con {
    // padding: 20px;
    margin-top: 24px;
    li {
      padding: 6px 0px;
      padding: 6px 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .my-friends-con {
    .friend {
      display: flex;
      align-items: center;
      margin: 8px 0px;
    }
  }
}
</style>


