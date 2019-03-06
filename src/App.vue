<template>
  <div id="app">
    <!-- <toolbar /> -->
    <router-view v-loading="isAutoLogin"/>
    <div class="app-dialog" v-if="isShowDialog">
      <div class="dialog-header">
        <span>好友申请消息</span>
        <icon-svg iconClass="close" @click.native="isShowDialog=false"></icon-svg>
      </div>
      <ul class="dialog-bodyer">
        <li v-for="apply in applys" :key="apply.id">
          <span>{{apply.verify_message}}</span>
          <span>
            备注：
            <input v-model="apply.remark">
          </span>
          <button @click="allowApply(apply)">同意</button>
          <button @click="ignoreApply(apply.id)">忽略</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getItem, setItem } from "@/utils/storage";
import { infoApi } from "@/api/login";
import { findApplyApi, allowJoinFriendApi, ignoreApplyApi } from "@/api/chat";
// import io from "socket.io-client";
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
            // const socket = io("localhost:3000");
            // socket.emit("user", res.user);
            // socket.on("hello", data => {
            //   console.log(data);
            // });
            this.isAutoLogin = false;
          })
          .catch(() => {
            this.isAutoLogin = false;
          });
      }
    },
    getNotifys(invitees_uid) {
      findApplyApi({ invitees_uid }).then(({ applys }) => {
        this.applys = applys || {};
        this.isShowDialog = this.applys.length > 0;
      });
    },
    allowApply(apply) {
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
      }).then(() => {});
    },
    ignoreApply(applyid) {
      ignoreApplyApi(applyid).then(() => {});
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
  display: flex;
  flex-direction: column;
  min-height: 100%;
  // height: 100%;
  background-color: #f6f7f9;
  // overflow: hidden;
}
.app-dialog {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #fff;
  padding: 20px;
  .dialog-header {
    display: flex;
    justify-content: space-between;
  }
  .dialog-bodyer {
    margin-top: 16px;
  }
}
</style>
