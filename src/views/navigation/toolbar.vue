<template>
  <div class="layout-container">
    <nav>
      <ul>
        <li @click="goRoute('/home')">首页</li>
        <li @click="goRoute('/title')">Title</li>
        <li @click="goRoute('/chat')">聊天</li>
      </ul>
      <div>
        <span v-if="user.userInfo.name">{{user.userInfo.name}}</span>
        <span v-else @click="goRoute('/login')">登陆</span>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "toolbar",
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goRoute(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


