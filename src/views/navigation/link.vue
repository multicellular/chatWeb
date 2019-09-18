<template>
  <div class="link_wrap">
    <div class="works_order">
      <div class="order_circle" data-id="1">
        <span class="circle"></span>
        <span class="hover-circle">HOME</span>
      </div>
      <div class="order_line"></div>
      <div class="order_circle" data-id="1" data-type="case" data-case="1" @click="$route.push('/chat')">
        <span class="circle"></span>
        <span class="hover-circle">CHAT</span>
      </div>
      <div class="order_line"></div>
      <div class="order_circle" data-id="2" data-type="case" data-case="2" @click="$route.push('/blog')">
        <span class="circle"></span>
        <span class="hover-circle">BLOG</span>
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
  </div>
</template>

<script>
export default {
  name: "nav-link"
};
</script>

<style lang="scss" scoped>
.link_wrap {
  position: relative;
}
.works_order {
  position: absolute;
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
</style>