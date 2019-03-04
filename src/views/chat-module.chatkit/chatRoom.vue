<template>
  <div class="page-container">
    <div class="main-container">
      <div class="my-rooms-con">
        <div class="room-title">我的房间:</div>
        <ul class="rooms">
          <li v-for="room in rooms" :key="room.id" @click="goChat(room)">
            <span class="room-name">{{room.name}}</span>
          </li>
        </ul>
        <ul class="rooms">
          <li v-for="newRoom in newRooms" :key="newRoom.id" @click="goChat(newRoom)">
            <span class="room-name">{{newRoom.name}}</span>
          </li>
        </ul>
        <div class="create-btn-con">
          <input placeholder="输入房间名" v-model="createRoomName">
          <button @click="createRoom">创建房间</button>
        </div>
      </div>
      <div class="public-rooms-con">
        <div class="room-title">全部话题</div>
        <ul class="rooms">
          <li v-for="room in publicRooms" :key="room.id">
            <span class="room-name">{{room.name}}</span>
            <button class="join-room-btn" @click="goChat(room)">加入房间</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import robot from "@/utils/robot";
// import getChatManager from "@/utils/chatkit";
import { createRoomApi } from "@/api/login";
export default {
  data() {
    return {
      newRooms: [],
      createRoomName: "",
      publicRooms: []
    };
  },
  computed: {
    ...mapGetters(["user"]),
    currentUser() {
      return this.user.chatUser || {};
    },
    rooms() {
      return this.currentUser.rooms;
    }
  },
  watch: {
    currentUser(val) {
      if (val && val.getJoinableRooms) {
        this.initPublicRoom(val);
      }
    }
  },
  mounted() {
    if (this.currentUser && this.currentUser.getJoinableRooms) {
      this.initPublicRoom(this.currentUser);
    }
  },
  methods: {
    initPublicRoom(currentUser) {
      currentUser
        .getJoinableRooms()
        .then(rooms => {
          // do something with the rooms
          this.publicRooms = rooms;
          console.log(rooms, "rooms");
        })
        .catch(err => {
          console.log(`Error getting joinable rooms: ${err}`);
        });
    },
    goChat(room) {
      this.$router.push({
        // path: "chat",
        name: "groupChat",
        params: {
          room
        }
      });
    },
    createRoom() {
      if (this.createRoomName) {
        createRoomApi({
          userId: this.user.userInfo.id,
          roomName: this.createRoomName,
          // userIds: [res.id],
          isPrivate: true
        })
          .then(room => {
            this.newRooms.push(room);
          })
          .catch(err => console.log(err));
        this.createRoomName = "";
      }
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


