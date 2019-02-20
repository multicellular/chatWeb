<template>
  <div>
    <div class="cube">
      <div class="face top">
        <div class="top-slot-con">
          <slot name="face-top">
            face-top-slot
          </slot>
        </div>
      </div>
      <div class="face left">
        <slot name="face-left">
          face-left-slot
        </slot>
      </div>
      <div class="face right">
        <slot name="face-right">
          face-right-slot
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .cube {
    position: absolute;
    left: 50%;
    top: 300px;
    -webkit-transition: -webkit-transform 1s linear;
    -moz-transition: -moz-transform 1s linear;
    -o-transition: -o-transform 1s linear;
    -ms-transition: -ms-transform 1s linear;
    transition: transform 1s linear;
    &:hover {
      -webkit-transform: translate(202px, 115px);
      -moz-transform: translate(202px, 115px);
      -o-transform: translate(202px, 115px);
      -ms-transform: translate(202px, 115px);
      transform: translate(202px, 115px);
      .top .top-slot-con,
      .left,
      .right {
        background-color: #ffc;
      }
    }
    .face {
      position: absolute;
    }
    .top-slot-con,
    .left,
    .right {
      padding: 10px;
      width: 180px;
      height: 180px;
    }
    .top {
      -webkit-transform: rotate(60deg);
      -moz-transform: rotate(60deg);
      -o-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
      transform: rotate(60deg);
      top: -158px;
      left: 100px;
      .top-slot-con {
        -webkit-transform: skew(0deg, -30deg) scale(1, 1.16);
        -moz-transform: skew(0deg, -30deg) scale(1, 1.16);
        -o-transform: skew(0deg, -30deg) scale(1, 1.16);
        -ms-transform: skew(0deg, -30deg) scale(1, 1.16);
        transform: skew(0deg, -30deg) scale(1, 1.16);
        background-color: #eee;
        font-size: 0.862em;
      }
    }
    .left {
      -webkit-transform: skew(0deg, 30deg);
      -moz-transform: skew(0deg, 30deg);
      -o-transform: skew(0deg, 30deg);
      -ms-transform: skew(0deg, 30deg);
      transform: skew(0deg, 30deg);
      background-color: #ccc;
    }
    .right {
      -webkit-transform: skew(0deg, -30deg);
      -moz-transform: skew(0deg, -30deg);
      -o-transform: skew(0deg, -30deg);
      -ms-transform: skew(0deg, -30deg);
      transform: skew(0deg, -30deg);
      background-color: #ddd;
      left: 200px;
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

