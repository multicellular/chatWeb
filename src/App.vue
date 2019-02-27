<template>
  <div id="app">
    <!-- <toolbar /> -->
    <router-view v-loading="isAutoLogin"/>
  </div>
</template>

<script>
import { getItem } from "@/utils/storage";
import { loginApi } from "@/api/login";
export default {
  name: "app",
  data(){
    return {
      isAutoLogin: false
    }
  },
  created() {
    // this.autoLogin();
  },
  methods: {
    autoLogin() {
      const account = getItem("userAccount", true);
      if (account) {
        this.isAutoLogin = true;
        return loginApi(account)
          .then(res => {
            this.isAutoLogin = false;
            this.$store.commit("SET_USER_INFO", res);
            if (this.$route.path === '/login') {
              this.$router.push('/home');
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
