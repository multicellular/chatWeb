<template>
  <div id="blog-module" class="module-container">
    <nav class="page-nav">
      <div class="nav-main">
        <i class="el-icon-menu"></i>
        <span class="nav-menu" @click="$router.push('/chat')">chat</span>
        <span class="nav-menu" @click="$router.push('/home')">home</span>
        <div>
          <button @click="clickPostBlog">postBlog</button>
        </div>
      </div>
      <div class="nav-other">
        <el-dropdown v-if="user.hasInfo" @command="handleCommand">
          <span class="el-dropdown-link">
            {{user.userInfo && user.userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="blogBook">blogBook</el-dropdown-item>
            <el-dropdown-item command="myBlogBook">myBlogBook</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { navMixin } from "@/utils/mixins";
import { mapGetters } from "vuex";
/* global GLOBAL */
export default {
  name: "blog-module",
  mixins: [navMixin],
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    clickPostBlog() {
      GLOBAL.vbus.$emit('clickPostBlog');
    },
    handleCommand(command) {
      switch (command) {
        case "myBlogBook":
          this.$router.push("myBlogBook");
          break;
        case "blogBook":
          this.$router.push("blogBook");
          break;
        default:
          console.log("no command");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 1000px) {
  #blog-module {
    padding: 0 !important;
  }
}
#blog-module {
  height: 100vh;
  overflow: hidden;
  padding: 2vh 20%;
  .page-nav {
    min-height: 60px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    background-color: #fafbfcf2;
    justify-content: space-between;
    .nav-main {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }
    .el-icon-menu {
      font-size: 20px;
      // margin-left: 16px;
    }
    .nav-menu {
      margin: 16px;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .blog-nav {
    // position: absolute;
    // top: 40px;
    // background-color: #fafbfc;
    // margin: 0px 60px;
  }
}
</style>