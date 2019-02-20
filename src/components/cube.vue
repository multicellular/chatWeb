<template>
  <div>
    <div>
      <div class="backdrop">
        <slot>backdrop backdrop backdrop backdrop backdrop</slot>
      </div>
      <div class="cube">
        <div class="face top">
          <slot name="face-top">face-top</slot>
        </div>
        <div class="face left">
          <slot name="face-left">face-left</slot>
        </div>
        <div class="face right">
          <slot name="face-right">face-right</slot>
        </div>
        <!-- <div class="face shadow"></div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .backdrop {
    width: 600px;
    color: #0f0;
    font-family: monospace;
    font-size: 24px;
    margin: 0 auto;
    -webkit-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
    -ms-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
    -moz-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
    -o-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
    transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
  }
  
  .cube {
    position: absolute;
    top: 90px;
    left: 360px;
    .face {
      position: absolute;
      width: 200px;
      height: 200px;
      overflow: hidden;
      font-family: monospace;
      font-size: 24px;
    }
    .top {
      top: 0;
      left: 86px;
      background: #fff;
      color: #999;
      /* -webkit-transform: matrix(0.8965754721680534, -0.5176380902050416, 0.8965754721680536, 0.5176380902050415, 0, 0); */
      -webkit-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
      -ms-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
      -moz-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
      -o-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
      transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
    }
    .left {
      top: 165px;
      left: 0;
      background: #999;
      color: #333;
      /* -webkit-transform: matrix(0.8965754721680536, 0.5176380902050415, 0, 1.035276180410083, 0, 0); */
      -webkit-transform: rotate(30deg) skewX(30deg) skewY(0deg);
      -ms-transform: rotate(30deg) skewX(30deg) skewY(0deg);
      -moz-transform: rotate(30deg) skewX(30deg) skewY(0deg);
      -o-transform: rotate(30deg) skewX(30deg) skewY(0deg);
      transform: rotate(30deg) skewX(30deg) skewY(0deg);
    }
    .right {
      top: 165px;
      left: 172px;
      background: #ccc;
      color: #666;
      /* -webkit-transform: matrix(0.8965754721680536, -0.5176380902050415, 0, 1.035276180410083, 0, 0); */
      -webkit-transform: rotate(-30deg) skewX(-30deg) skewY(0deg);
      -ms-transform: rotate(-30deg) skewX(-30deg) skewY(0deg);
      -moz-transform: rotate(-30deg) skewX(-30deg) skewY(0deg);
      -o-transform: rotate(-30deg) skewX(-30deg) skewY(0deg);
      transform: rotate(-30deg) skewX(-30deg) skewY(0deg);
    }
    .shadow {
      top: 330px;
      left: -86px;
      background: black;
      opacity: 0.5;
      -webkit-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
      -ms-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
      -moz-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
      -o-transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
      transform: rotate(-30deg) skewX(30deg) skewY(0deg) scaleY(0.87);
    }
  }
</style>

