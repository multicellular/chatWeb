<template>
  <div id="chat-module" class="module-container">
    <nav class="nav-container">
      <ul class="nav-ul">
        <li @click="goRoute(navs['home'].path)">{{navs['home'].name}}</li>
        <li @click="goRoute(navs['blog'].path)">{{navs['blog'].name}}</li>
        <!-- <li @click="goRoute(navs['game'].path)">{{navs['game'].name}}</li> -->
      </ul>
    </nav>
    <router-view v-loading="isLoading"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navMixin } from "@/utils/mixins";
import chatkit from "@/utils/chatkit";
export default {
  name: "chat-module",
  mixins: [navMixin],
  data() {
    return {
      isDestroy: false,
      isLoading: true
    };
  },
  computed: {
    ...mapGetters(["user"]),
    userId() {
      return this.user.userInfo.id || "";
    }
    // isLoading() {
    //   return !this.user.chatUser;
    // }
  },
  watch: {
    userId(val) {
      if (val) {
        this.initChatkit();
      }
    }
  },
  created() {
    if (this.userId) {
      this.initChatkit();
    }
  },
  methods: {
    initChatkit() {
      const userId = this.user.userInfo.id;
      chatkit(userId)
        .then(curUser => {
          if (this.isDestroy) {
            // chatUser.disconnect();
          } else {
            this.$store.commit("SET_CHAT_USER", curUser);
            this.isLoading = false;
          }
        })
        .catch(err => console.log(err));
    }
  },
  beforeDestroy() {
    this.isDestroy = true;
    if (this.user.chatUser && this.user.chatUser.disconnect) {
      this.user.chatUser.disconnect();
      this.$store.commit("CLEAR_CHAT_USER");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


