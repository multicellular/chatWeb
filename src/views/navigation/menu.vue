<template>
  <div class="menu-wrap">
    <div class="menu-btn-wrap">
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
export default {
  data() {
    return {
      onPressed: false
    };
  }
};
</script>

<style lang="scss" scoped>
.menu-btn-wrap {
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

//  <!-- 菜单页 -->
.full_screen {
    width: 100%;
    height: 100%;
}
.main_menu {
  background-color: #1c1d24;
  -webkit-backface-visibility: hidden;
  transition: transform 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
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
  /*transition: transform 0.3s ease-in-out , opacity 0.3s;*/
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
  /*transition: transform 0.5s ease-in-out ,color 0.5s ease-in-out;*/
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