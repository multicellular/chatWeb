<template>
  <div class="homepage-wrap">
    <!-- 导航页 -->
    <header class="header-wrapper">
      <div class="nav-container">
        <nav-link class="link" />
        <nav-menu />
        <div class="logo">{{user.userInfo && user.userInfo.name ? user.userInfo.name:'SHARE'}}</div>
        <span @click="goRoute('/login')">登陆/注册</span>
      </div>
    </header>
    <!-- 引导页 -->
    <div class="index_box full_screen v1" :class="{'hide_index':isShowMain}">
      <div id="index_video"></div>
      <div class="slash_bg full_screen">
        <AutoText text="what should we do" class="auto-text"></AutoText>
        <a class="arrow_box" href="javascript:;" id="scrollBtn">
          <svg>
            <circle cx="50" cy="50" r="30" stroke="#fff" stroke-width="2" fill="none" />
          </svg>
        </a>
      </div>
    </div>
    <!-- 主页 -->
    <div class="main_box full_screen v1">
      <div class="full_screen">
        <div class="case1">
          <div id="box_bg "></div>
          <div id="box_title "></div>
        </div>
        <div class="case2">
          <div id="box_bg "></div>
          <div id="box_title "></div>
        </div>
        <div class="case3">
          <div id="box_bg "></div>
          <div id="box_title "></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navMixin } from "@/utils/mixins";
import link from "Nav/link";
import menu from "Nav/menu";
import AutoText from "@/components/autoText";
export default {
  name: "home-module",
  components: {
    "nav-link": link,
    "nav-menu": menu,
    AutoText
  },
  data() {
    return {
      onPressed: false,
      isShowMain: false
    };
  },
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
    },
    scrollToMain() {
      this.isShowMain = true;
    }
  }
};
</script>

<style lang="scss" scoped>
$assets_path: "../../assets/";
.homepage-wrap {
  height: 100%;
  overflow: hidden;
}

.header-wrapper {
  width: 100%;
  z-index: 10;
  position: fixed;
  .nav-container {
    display: flex;
    color: #fff;
    align-items: center;
    width: 1200px;
    margin: auto;
    position: relative;
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
  background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  background-size: 200% 100%;
  animation: masked-animation 10s linear;
  font-size: 35px;
  margin-right: 16px;
}

@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.link {
  top: 55px;
  left: 45px;
}

.full_screen {
  width: 100%;
  height: 100%;
}

//  <!-- 引导页 -->
.index_box {
  position: relative;
  z-index: 5;
  flex: auto;
}

.index_box.hide_index {
  margin-top: -100%;
  transition: margin 1s;
}

.index_box #index_video {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url($assets_path+"images/video_default.jpg") no-repeat;
  background-size: cover;
}

.index_box .slash_bg {
  background: url($assets_path+"images/slash.png");
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.slash_bg .auto-text {
  font-size: 26px;
}

.slash_bg .arrow_box {
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden;
  svg {
    width: 100px;
    height: 100px;
    position: absolute;
    transition: 0.5s;
    transition-timing-function: cubic-bezier(0, 0.98, 0.485, 1);
  }
  &::after {
    content: "V";
    position: absolute;
    color: #fff;
    left: 45px;
    top: 40px;
  }
  &:hover {
    &::after {
      animation: scroll 0.7s ease-in-out;
    }
    svg {
      transform: scale(1.2, 1.2);
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateY(50%);
  }
  50% {
    transform: translateY(200%);
  }
  51% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(50%);
  }
}
</style>


