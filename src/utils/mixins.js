import { removeItem } from "@/utils/storage";
// 获取服务器设置的cookie
import * as cookies from "browser-cookies";

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
      cookies.erase('oauth_token');
      this.$router.push(path);
      /* global GLOBAL */
      GLOBAL.vbus.$emit("user_offline");
    }
  }
}

export { navMixin };