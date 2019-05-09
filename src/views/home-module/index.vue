<template>
  <div id="home-module">
    <div class="module-container">
      <nav class="nav-container">
        <ul class="nav-ul">
          <li class="logo">Share</li>
          <li @click="goRoute(navs['chat'].path)">{{navs['chat'].name}}</li>
          <li @click="goRoute(navs['blog'].path)">{{navs['blog'].name}}</li>
        </ul>
        <div class="nav-other">
          <img class="avator-image" :src="user.userInfo.avator">
          <el-dropdown v-if="user.hasInfo" @command="handleCommand">
            <span class="el-dropdown-link">
              {{user.userInfo && user.userInfo.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="sign out">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="other-item" v-else @click="goRoute('/login')">登陆/注册</span>
        </div>
      </nav>
      <router-view/>
      <footer class="footer-container">
        <div class="el-icon-con">
          <i class="el-icon-upload"></i>
          <i class="el-icon-location"></i>
          <i class="el-icon-question"></i>
        </div>
        <div></div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navMixin } from "@/utils/mixins";
export default {
  name: "home-module",
  mixins: [navMixin],
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "setting":
          this.goRoute("/setting");
          break;
        case "sign out":
          this.signOut("/home");
          break;
        default:
          console.log("no command");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#home-module {
  padding: 10px;
  background-color: #ffef00;
  // min-height: 100%;
  display: flex;
  flex: auto;
}
.module-container {
  background-color: #f6f7f9;
  .other-item {
    background-color: #ffef00;
  }
}
.footer-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  height: 80px;
  align-items: center;
  .el-icon-con i {
    font-size: 24px;
    margin-right: 20px;
  }
}
.logo {
  background-image: -webkit-linear-gradient(
    left,
    blue,
    #66ffff 10%,
    #cc00ff 20%,
    #cc00cc 30%,
    #ccccff 40%,
    #00ffff 50%,
    #ccccff 60%,
    #cc00cc 70%,
    #cc00ff 80%,
    #66ffff 90%,
    blue 100%
  );
  -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
  -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
  font-size: 35px;
}
@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
