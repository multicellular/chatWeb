<template>
  <div id="app">
    <!-- <toolbar /> -->
    <router-view v-loading="isAutoLogin"/>
  </div>
</template>

<script>
import { getItem, setItem } from "@/utils/storage";
import { infoApi } from "@/api/login";
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
            this.isAutoLogin = false;
            setItem("userInfo", res.user, true); // 无token时，本地头像展示
            this.$store.commit("SET_USER_INFO", res.user); // store 存储userinfo
            if (this.$route.path === "/login") {
              this.$router.push("/home");
            }
            return res;
          })
          .catch(err => {
            this.isAutoLogin = false;
            console.log(err);
            return Promise.reject(err);
          });
      } else {
        return Promise.reject("未登陆");
      }
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
