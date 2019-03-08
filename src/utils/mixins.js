import { removeItem } from "@/utils/storage";
const navMixin = {
  data() {
    return {
      navs: {
        home: {
          path: '/home',
          name: '首页'
        },
        chat: {
          path: '/chat',
          name: '聊天'
        },
        game: {
          path: '/game',
          name: '游戏'
        },
        blog: {
          path: '/blog',
          name: '博客'
        }
      }
    };
  },
  methods: {
    goRoute(path) {
      this.$router.push(path);
    },
    signOut(path) {
      this.$store.commit('CLEAR_USER_INFO');
      removeItem("my_token", true);
      removeItem("userInfo", true);
      this.$router.push(path);
      /* global GLOBAL */
      GLOBAL.vbus.$emit("user_offline");
    }
  }
}

export { navMixin };