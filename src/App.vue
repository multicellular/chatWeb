<template>
  <div id="app">
    <!-- <toolbar /> -->
    <router-view v-loading="isAutoLogin"/>
    <div class="app-dialog" v-if="isShowDialog">
      <div class="dialog-header">
        <span>好友申请消息</span>
        <i class="el-icon-circle-close-outline" @click="isShowDialog=false"></i>
      </div>
      <ul class="dialog-bodyer">
        <li v-for="(apply, idx) in applys" :key="apply.id">
          <span class="message">{{apply.verify_message}}</span>
          <!-- <span>
            备注：
            <input v-model="apply.remark">
          </span>-->
          <i class="el-icon-close" @click="ignoreApply(apply,idx)"></i>
          <i class="el-icon-check" @click="allowApply(apply,idx)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getItem, setItem, removeItem } from "@/utils/storage";
import { infoApi } from "@/api/login";
import { findApplyApi, allowJoinFriendApi, ignoreApplyApi } from "@/api/chat";
// import socket from "@/utils/socket";
import Web_Socket from "@/utils/webSocket";

/* global GLOBAL */
export default {
  name: "app",
  data() {
    return {
      isAutoLogin: false,
      isShowDialog: false,
      applys: []
    };
  },
  created() {
    this.autoLogin();
    GLOBAL.vbus.$on("user_online", user => {
      this.getNotifys(user.id);
    });
    GLOBAL.vbus.$on("user_offline", () => {
      this.isShowDialog = false;
    });
  },
  methods: {
    autoLogin() {
      const token = getItem("my_token", true);
      if (token) {
        this.isAutoLogin = true;
        return infoApi()
          .then(res => {
            setItem("userInfo", res.user, true); // 无token时，本地头像展示
            this.$store.commit("SET_USER_INFO", res.user); // store 存储userinfo
            if (this.$route.path === "/login") {
              this.$router.push("/home");
            }
            GLOBAL.vbus.$emit("user_online", res.user);
            // socket.emit("login", res.user);
            var web_socket = new Web_Socket(
              "/connect/" + res.user.id
            ).getWebSocket();
            web_socket.send("connect");
            web_socket.onmessage = message => {
              var msg = JSON.parse(message);
              this.$message({
                message: msg.content,
                type: "success"
              });
            };
            this.isAutoLogin = false;
          })
          .catch(() => {
            this.isAutoLogin = false;
            removeItem("my_token", true);
          });
      }
    },
    getNotifys(invitees_uid) {
      findApplyApi({ invitees_uid }).then(({ applys }) => {
        this.applys = applys || {};
        this.isShowDialog = this.applys.length > 0;
      });
    },
    allowApply(apply, idx) {
      const {
        remark: uremark,
        apply_uid,
        apply_flist_id,
        invitees_uid,
        invitees_flist_id,
        id: applyId
      } = apply;
      allowJoinFriendApi({
        uremark,
        apply_uid,
        apply_flist_id,
        invitees_uid,
        invitees_flist_id,
        applyId
      }).then(() => {
        this.applys.splice(idx, 1);
        if (this.applys.length === 0) {
          this.isShowDialog = false;
        }
      });
    },
    ignoreApply(apply, idx) {
      ignoreApplyApi(apply.id).then(() => {
        this.applys.splice(idx, 1);
        if (this.applys.length === 0) {
          this.isShowDialog = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  // display: flex;
  // flex-direction: column;
  min-height: 100%;
  width: 100%;
  height: 100%;
  // height: 100%;
  background-color: #f6f7f9;
  // overflow: hidden;
}
.app-dialog {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  .dialog-header {
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    span {
      margin-top: 12px;
    }
    .el-icon-circle-close-outline {
      transform: scale(1.5);
      cursor: pointer;
    }
  }
  .dialog-bodyer {
    padding: 20px;
    .message {
      margin-right: 12px;
    }
    .el-icon-close {
      color: red;
      cursor: pointer;
    }
    .el-icon-check {
      color: #07cc48;
      cursor: pointer;
    }
  }
}
</style>
