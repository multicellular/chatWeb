<template>
  <div id="chat-module" class="module-container">
    <nav class="nav-container">
      <ul class="nav-ul">
        <li @click="goRoute(navs['home'].path)">{{navs['home'].name}}</li>
        <li @click="goRoute(navs['blog'].path)">{{navs['blog'].name}}</li>
        <!-- <li @click="goRoute(navs['game'].path)">{{navs['game'].name}}</li> -->
      </ul>
    </nav>
    <nav class="chat-nav">
      <div
        class="nav-item"
        @click="goRoute('chatRoom')"
        :class="{active: $route.name ==='chatRoom'}"
      >好友列表</div>
      <div
        class="nav-item"
        @click="goRoute('groupChat')"
        :class="{active: $route.name ==='groupChat'}"
      >聊天信息</div>
      <!-- <div
        class="nav-item"
        @click="goRoute('publicChat')"
        :class="{active: $route.name ==='publicChat'}"
      >公共主题</div> -->
    </nav>
    <router-view v-if="!isLoading"/>
    <div v-loading="isLoading"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navMixin } from "@/utils/mixins";
export default {
  name: "chat-module",
  mixins: [navMixin],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),
    isLoading() {
      return !this.user.hasInfo;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.chat-nav {
  display: flex;
  height: 6vh;
  .nav-item {
    margin: 12px;
    opacity: 0.6;
    &.active {
      color: #1989fa;
      opacity: 1;
    }
  }
}
</style>


