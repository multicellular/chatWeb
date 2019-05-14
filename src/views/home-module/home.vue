<template>
  <div class="homepage-wrap">
    <!-- 导航页 -->
    <header class="header-wrapper">
      <div class="nav-container">
        <div class="menu-wrap">
          <svg id="menu-circle">
            <circle
              class="circle"
              cx="50"
              cy="50"
              r="40"
              stroke="#fff"
              stroke-width="2"
              fill="none"
              shape-rendering="geometricPrecision"
              data-svg-origin="50 50"
              :style="{'stroke-dashoffset': onPressed ? 1e-05 : 252.327}"
              style="stroke-dasharray: 252.327, 262.327; transform-origin: 0px 0px 0px; transform: matrix(0, -1, 1, 0, 0, 100); stroke: rgb(255, 255, 255);"
            ></circle>
          </svg>
          <div class="burger-wrap" @click="onPressed=!onPressed">
            <div class="burger" :class="{'open':onPressed}"></div>
          </div>
        </div>
        <div class="works_order">
          <div class="order_circle" data-id="1">
            <span class="circle"></span>
            <span class="hover-circle">HOME</span>
          </div>
          <div class="order_line"></div>
          <div class="order_circle" data-id="1" data-type="case" data-case="1">
            <span class="circle"></span>
            <span class="hover-circle" @click="goRoute(navs['chat'].path)">{{navs['chat'].name}}</span>
          </div>
          <div class="order_line"></div>
          <div class="order_circle" data-id="2" data-type="case" data-case="2">
            <span class="circle"></span>
            <span class="hover-circle" @click="goRoute(navs['blog'].path)">{{navs['blog'].name}}</span>
          </div>
          <div class="order_line"></div>
          <div class="order_circle" data-id="3" data-type="case" data-case="3">
            <span class="circle"></span>
            <span class="hover-circle">SOCIAL</span>
          </div>
          <div class="order_line"></div>
          <div class="order_circle" data-id="4" data-type="case" data-case="4">
            <span class="circle"></span>
            <span class="hover-circle">OUTDOOR</span>
          </div>
          <div class="order_line"></div>
          <div class="order_circle" data-id="3">
            <span class="circle"></span>
            <span class="hover-circle">ABOUT</span>
          </div>
          <div class="order_line"></div>
          <div class="order_circle" data-id="4">
            <span class="circle"></span>
            <span class="hover-circle">CAREERS</span>
          </div>
          <div class="current_works" style="transform: matrix(-1, 0, 0, -1, 0, 0);">
            <span class="icon-arrow-2"></span>
          </div>
        </div>
        <div class="logo">SHARE</div>
        <span v-if="user.hasInfo">{{user.userInfo && user.userInfo.name}}</span>
        <span v-else @click="goRoute('/login')">登陆/注册</span>
      </div>
    </header>
    <!-- 引导页 -->
    <div class="index_box full_screen v1" :class="{'hide_index':isShowMain}">
      <div id="index_video"></div>
      <div class="slash_bg full_screen">
        <h1 class="line" style="opacity: 1;">
          <div class="gene-text" style="opacity: 1; display: block;">
            <span>JUST</span>
            <span>
              <span class="adj" style="white-space:pre;">DO</span>
              <span class="typed-cursor" style="display: none;">_</span>
            </span>
            <span class="gene">IT</span>
          </div>
          <span class="all" style="opacity: 0; display: none;">TODO</span>
          <div class="name-title">
            <span class="title team" style="opacity: 1; margin-top: 0px; display: block;">
              <span class="name">everyone</span>
              <span class="divide">/</span>
              <span class="job_title">todo</span>
            </span>
            <span class="title for-all" style="opacity: q; display: none;">
              the time
              <span class="break-line">is going</span>
            </span>
          </div>
        </h1>
        <a class="arrow_box" href="javascript:;" id="scrollBtn">
          <svg>
            <circle cx="50" cy="50" r="30" stroke="#fff" stroke-width="2" fill="none"></circle>
          </svg>
          <div class="arrow-wrap" @click="scrollToMain">
            <div class="icon-arrow"></div>
          </div>
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
    <!-- 菜单页 -->
    <div class="main_menu full_screen" :class="onPressed?'menu_show':'not_show'">
      <div class="main_menu_center">
        <ul>
          <li>
            <a href="#" class="menu-btn" data-cut="1">
              <span class="left-bar"></span>
              <span class="menu-title">
                OUR GENES
                <span class="icon-arrow-2"></span>
              </span>
              <!-- <span class="right-bar"></span> -->
            </a>
          </li>
          <li>
            <a href="#" class="menu-btn" data-cut="2" data-type="case" data-case="1">
              <!-- <span class="left-bar"></span> -->
              <span class="menu-title">
                WHAT WE DO
                <span class="icon-arrow-2"></span>
              </span>
              <span class="right-bar"></span>
            </a>
          </li>
          <li>
            <a href="#" class="menu-btn" data-cut="3">
              <span class="left-bar"></span>
              <span class="menu-title">
                WHO WE ARE
                <span class="icon-arrow-2"></span>
              </span>
              <!-- <span class="right-bar"></span> -->
            </a>
          </li>
          <li>
            <a href="#" class="menu-btn" data-cut="4">
              <!-- <span class="left-bar"></span> -->
              <span class="menu-title">
                JOIN US
                <span class="icon-arrow-2"></span>
              </span>
              <span class="right-bar"></span>
            </a>
          </li>
        </ul>
        <div class="to_socialmedia_box">
          <div class="f_left">
            <span class="to_fb ga-out-btn" data-ga="menu_btn_fb" href target="_blank">
              <svg class="white-stroke">
                <circle
                  cx="35"
                  cy="35"
                  r="32"
                  stroke="#8e8e92"
                  stroke-width="2"
                  fill="none"
                  shape-rendering="geometricPrecision"
                ></circle>
              </svg>
              <div class="icon_style icon-fb"></div>
            </span>
          </div>
          <div class="clear_both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navMixin } from "@/utils/mixins";
export default {
  name: "home-module",
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
  // display: flex;
  // flex-direction: column;
  // flex: auto;
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
  -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  -webkit-background-size: 200% 100%;
  // -webkit-animation: masked-animation 4s linear infinite;
  font-size: 35px;
  margin-right: 16px;
}
// @keyframes masked-animation {
//   0% {
//     background-position: 0 0;
//   }
//   100% {
//     background-position: -100% 0;
//   }
// }
.menu-wrap {
  position: relative;
  cursor: pointer;
  #menu-circle {
    width: 100px;
    height: 100px;
    transform: scale(0.9);
    // position: absolute;
    .circle {
      transition: stroke-dashoffset 1s ease-out;
    }
  }
  .burger-wrap {
    width: 35px;
    height: 36px;
    top: 33px;
    left: 33px;
    position: absolute;
    .burger {
      width: 100%;
      height: 4px;
      background-color: #fff;
      margin-top: 15px;
      border-radius: 20px;
      position: relative;
      transition: 0.3s;
      transition-timing-function: ease-out;
      &::before,
      &::after {
        background: #fff;
        content: "";
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 20px;
        transition: 0.3s;
        transition-timing-function: ease-in-out;
      }
      &::before {
        left: 0;
        top: -10px;
      }
      &::after {
        right: 0;
        top: 10px;
      }
      &.open {
        background-color: transparent;
      }
      &.open::before {
        // width: 100%;
        transform: rotate(45deg) translateY(7px) translateX(7px);
      }
      &.open::after {
        // width: 100%;
        transform: rotate(-45deg) translateY(-7px) translateX(7px);
      }
      &.black,
      &.black::after,
      &.black::before {
        background-color: #313131;
      }
    }
    &:hover {
      .burger {
        &::before,
        &::after {
          width: 50%;
        }
      }
      .burger.open {
        &::before,
        &::after {
          width: 100%;
        }
      }
    }
  }
}

.works_order {
  position: absolute;
  top: 130px;
  left: 40px;
  .order_circle {
    font-size: 0;
    padding: 5px;
    margin-left: -5px;
    margin-bottom: -5px;
    margin-top: -5px;
    cursor: pointer;
    &:hover .hover-circle {
      opacity: 1;
      width: auto;
      height: 16px;
      color: #000;
      transform: translateY(-18%) translateX(-6px);
      padding: 0 9px;
    }
    &:hover .circle {
      color: #000;
      background: #000;
      border-color: #fff;
    }
    span {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      border: 2px solid #fff;
      cursor: pointer;
      transition: 0.2s;
      background: #fff;
      box-sizing: content-box;
    }
    .hover-circle {
      opacity: 0;
      display: inline-block;
      position: absolute;
      overflow: hidden;
      left: 0;
      width: 0px;
      height: 0px;
      border-radius: 25px;
      transform: translate(0);
      background: #fff;
      font-weight: bold;
      z-index: -1;
      color: transparent;
      font-size: 12px;
      text-align: center;
      /* display: inline-block; */
      line-height: 16px;
      text-indent: 14px;
      letter-spacing: 1px;
      font-family: AvantGarde_Thin;
      transition: 0.2s ease-in-out;
      white-space: nowrap;
    }
  }
  .order_line {
    width: 1px;
    height: 5vh;
    background-color: transparent;
    margin-top: 0;
    margin-left: 5px;
  }
  .current_works {
    width: 15px;
    height: 15px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    position: absolute;
    top: -2px;
    left: -2px;
    pointer-events: none;
  }
}

.full_screen {
  width: 100%;
  height: 100%;
}
.icon-arrow-2 {
  display: inline-block;
  width: 15px;
  height: 15px;
  text-align: center;
  margin: 0 auto;
  color: #000;
  font-size: 0.7em;
  &::before {
    content: "V";
  }
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
.slash_bg {
  background: url($assets_path+"images/slash.png");
  position: absolute;
  z-index: 4;
  box-sizing: border-box;
  padding: 2.5%;
}
.index_box h1.line {
  font-family: "AvantGarde_BT";
  font-size: 5.5em;
  line-height: 1.2;
  color: #fff;
  text-align: center;
  top: 50%;
  left: 50%;
  width: 100%;
  margin-left: -50%;
  margin-top: -2em;
  // opacity: 0;
  position: absolute;
  /*margin-top: -1.5em;*/
}
.adj {
  font-style: italic;
  border-bottom: 7px solid #fff;
}

.typed-cursor {
  opacity: 1;

  animation: blink 0.7s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.index_box h1 span.title {
  font-family: "AvantGarde_EX_light";
  font-size: 0.25em;
  color: #fff;
  letter-spacing: 2px;
  text-align: center;
  margin: 0 auto;
  padding: 3em;
  display: block;
}

.index_box h1 span.title.for-all {
  padding-top: 1.5em;
}

.index_box .arrow_box {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: absolute;
  bottom: 80px;
  left: 50%;
  margin-left: -50px;
}

.index_box .arrow_box .arrow-wrap {
  width: 70px;
  height: 70px;

  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translateX(-50%) translateY(-50%);
  overflow: hidden;
}

.index_box svg {
  width: 100px;
  height: 100px;
  position: absolute;

  transition: 0.5s;

  transition-timing-function: cubic-bezier(0, 0.98, 0.485, 1);
}

.index_box .icon-arrow {
  color: #fff;
  font-size: 2em;
  position: absolute;
  left: 50%;
  /*-webkit-transition: 0.4s;
            transition: 0.4s;*/
  margin-left: -0.5em;
  top: 50%;
  margin-top: -0.5em;
  /*-webkit-transition-timing-function: cubic-bezier(0.000, 0.980, 0.485, 1.000);
            transition-timing-function: cubic-bezier(0.000, 0.980, 0.485, 1.000);*/
  &::after {
    content: "V";
  }
}

.index_box .arrow_box:hover svg {
  transform: scale(1.2, 1.2);
}

.index_box .arrow_box:hover .icon-arrow {
  animation: scroll 0.7s ease-in-out;
}

@keyframes scroll {
  0% {
    top: 50%;
  }
  50% {
    top: 200%;
  }
  51% {
    top: -50%;
  }
  100% {
    top: 50%;
  }
}

//  <!-- 菜单页 -->
.main_menu {
  background-color: #1c1d24;
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 100;
  -webkit-backface-visibility: hidden;
  transition: transform 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
}

.main_menu.not_show {
  transform: translateX(-100%);
}
.main_menu.menu_show {
  transform: translateX(0%);
}

.main_menu .main_menu_center {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.main_menu .icon-arrow-2 {
  transform: rotate(-90deg) translateY(-50%);
  font-size: 18px;
  position: absolute;
  right: -80px;
  top: -2px;
  opacity: 1;
  color: #1c1d24;
  transition: 0.2s ease-in-out;
  &::before {
    content: "V";
  }
}

.main_menu .m_btn {
  display: none;
}

.arrow_left_box {
  display: block;
  width: 100px;
  height: 100px;
  position: relative;
  box-sizing: border-box;
  margin-top: 2em;
  margin-right: 2em;
}

.arrow_left_box svg {
  width: 100%;
  height: 100%;
}

.arrow_left_box .icon-arrow {
  font-size: 2em;
  position: absolute;
  top: 32px;
  left: 37px;
  color: #fff;
  transform: rotate(-90deg);
}

.main_menu ul {
  width: 266px;
  height: 43%;
  margin: 0 auto 0 auto; /*t10em*/
  /*background-color: red;*/
}

.main_menu ul li {
  position: relative;
}

.main_menu ul li a {
  display: block;
  color: #fff;
  font-family: "AvantGarde_EX_light";
  font-size: 1.25em;
  height: 75px;
  line-height: 75px;
  text-align: center;
  /*border-bottom: 1px solid #38383f;*/
  letter-spacing: 0.1em;
  /*position: relative;*/
  transition: color 0.3s ease-in-out;
}

.main_menu ul li a:hover {
  color: #ad2d07;
}

.main_menu ul li a:hover .icon-arrow-2 {
  right: -100px;
  /* opacity: 0.99; */
  /* display: none; */
  /* z-index: 100; */
  color: #ad2d07;
}

span.menu-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  opacity: 0;
  font-weight: bold;
  width: 60%;
}

.main_menu ul li a .left-bar {
  display: block;
  border-bottom: 1px solid #38383f;
  width: 0%;
  z-index: 3;
  position: absolute;
  bottom: 0;
}

.main_menu ul li a:nth-child(even) .left-bar {
  border: 0;
}

.main_menu ul li a .right-bar {
  display: block;
  border-bottom: 1px solid #38383f;
  width: 0%;
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
}

.main_menu.menu_show {
  ul li a .right-bar,
  ul li a .left-bar {
    width: 100%;
    transition: width 2s;
  }
  span.menu-title {
    top: 0%;
    opacity: 1;
    transition: top 2s;
  }
}

.main_menu .to_socialmedia_box {
  width: 266px;
  /*height: 70px;*/
  margin: 50px auto;
  /*background-color: red;*/
  box-sizing: border-box;
  /*margin-top: 10px;*/
  display: flex;
}

.main_menu .to_socialmedia_box div {
  // opacity: 0;
  margin-top: 10px;
}

.main_menu .to_socialmedia_box a {
  display: block;
  width: 70px;
  height: 70px;
  /*background-color: blue;*/
  position: relative;
  margin: 0 9px;
}

.main_menu .to_socialmedia_box a svg {
  width: 100%;
  height: 100%;
  /*-webkit-transition: -webkit-transform 0.3s ease-in-out , opacity 0.3s;
       -moz-transition: -moz-transform 0.3s ease-in-out , opacity 0.3s;
         -o-transition: -o-transform 0.3s ease-in-out , opacity 0.3s;
            transition: transform 0.3s ease-in-out , opacity 0.3s;*/
}

svg.hover-og {
  position: absolute;
}

.main_menu .icon_style {
  color: #8e8e92;
  font-size: 1.6em;
  position: absolute;
  bottom: 29%;
  left: 33%;
  /*-webkit-transition: -webkit-transform 0.5s ease-in-out ,color 0.5s ease-in-out;
       -moz-transition: -moz-transform 0.5s ease-in-out ,color 0.5s ease-in-out;
         -o-transition: -o-transform 0.5s ease-in-out ,color 0.5s ease-in-out;
            transition: transform 0.5s ease-in-out ,color 0.5s ease-in-out;*/
}

/*.main_menu .to_socialmedia_box a:hover svg{
    opacity: 0;
    transform: scale(0);
}*/
.main_menu .to_socialmedia_box a:hover .icon_style {
  /*transform: scale(1.25);
    color:#E85600;*/
  /*color:#a3381a;*/
}

.main_menu .to_socialmedia_box a:hover .icon_style.icon_youtube {
  color: #ca1b1f;
}
</style>


