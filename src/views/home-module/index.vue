<template>
  <div id="home-module">
    <div class="module-container">
      <nav class="nav-container">
        <ul class="nav-ul">
          <li @click="goRoute(navs['chat'].path)">{{navs['chat'].name}}</li>
          <li @click="goRoute(navs['blog'].path)">{{navs['blog'].name}}</li>
        </ul>
        <div class="nav-other">
          <span class="other-item" v-if="user.hasInfo">{{user.userInfo.name}}</span>
          <span class="other-item" v-else @click="goRoute('/login')">登陆</span>
          <span class="other-item" v-if="user.hasInfo" @click="signOut('/home')">退出</span>
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
  methods: {}
};
</script>

<style lang="scss" scoped>
#home-module {
  padding: 10px;
  background-color: #ffef00;
  min-height: 100%;
  display: flex;
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
</style>
