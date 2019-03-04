<template>
  <div id="app">
    <!-- <toolbar /> -->
    <router-view v-loading="isAutoLogin"/>
  </div>
</template>

<script>
import { getItem, setItem } from "@/utils/storage";
import { infoApi } from "@/api/login";
import { findApplyApi, allowJoinFriendApi } from "@/api/chat";
import io from "socket.io-client";
export default {
  name: "app",
  data() {
    return {
      isAutoLogin: false
    };
  },
  created() {
    this.autoLogin();
  },
  methods: {
    autoLogin() {
      const token = getItem("my_token", true);
      if (token) {
        this.isAutoLogin = true;
        return infoApi()
          .then(res => {
            if (res.code === 0) {
              setItem("userInfo", res.user, true); // 无token时，本地头像展示
              this.$store.commit("SET_USER_INFO", res.user); // store 存储userinfo
              if (this.$route.path === "/login") {
                this.$router.push("/home");
              }
              const socket = io("localhost:3000");
              socket.emit("user", res.user);
              socket.on("hello", data => {
                console.log(data);
              });
              this.isAutoLogin = false;
              this.getNotifys(res.user.id);
              return res;
            } else {
              this.isAutoLogin = false;
              return Promise.reject("未登陆");
            }
          })
          .catch(err => {
            this.isAutoLogin = false;
            return Promise.reject(err);
          });
      } else {
        this.isAutoLogin = false;
        return Promise.reject("未登陆");
      }
    },
    getNotifys(invitees_uid) {
      findApplyApi({ invitees_uid }).then(({ applys }) => {
        const len = applys && applys.length;
        for (let i = 0; i < len; i++) {
          const apply = applys[i];
          const {
            verify_message: uremark,
            apply_uid,
            apply_flist_id,
            invitees_uid,
            invitees_flist_id,
            id: applyId
          } = apply;
          let notify = this.$notify({
            title: "好友申请",
            message: "验证消息: " + apply.verify_message,
            duration: 0,
            onClick: () => {
              allowJoinFriendApi({
                uremark,
                apply_uid,
                apply_flist_id,
                invitees_uid,
                invitees_flist_id,
                applyId
              }).then(code => {
                if (code === 0) {
                  notify.close();
                }
              });
            }
          });
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
  display: flex;
  flex-direction: column;
  min-height: 100%;
  // height: 100%;
  background-color: #f6f7f9;
  // overflow: hidden;
}
</style>
