<template>
  <div>
    <span class="computeSpan" ref="computeSpan" >{{text}}</span>
    <div class="auto" v-if="isReady" :style="textStyle">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "auto-text",
  props: ["text"],
  data() {
    return {
      isReady: false,
      textStyle: {}
    };
  },
  mounted() {
    const width = this.$refs.computeSpan.getBoundingClientRect().width;
    // console.log(this.$refs.computeSpan.getBoundingClientRect());
    const steps = this.text.length;
    const duration = this.text.length/26 * 3;
    this.textStyle = {
      width: width + "px",
      'animation-timing-function': `steps(${steps}, end), step-end`,
      'animation-duration': `${duration}s, 0.3s`
    };
    this.isReady = true;
  }
};
</script>

<style lang="scss" scoped>
.computeSpan {
  opacity: 0;
  font: bold 200% Consolas, Monaco, monospace;
  overflow: hidden;
  // font-size: inherit;
}

.auto {
  color: beige;
  margin: auto;
  font: bold 200% Consolas, Monaco, monospace;
  // font-size: inherit;
  border-right: 0.1em solid;
  // width: 16.5em;
  width: 100%;
  // margin: 2em 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  animation: typing 2.5s steps(18, end),
    cursor-blink 0.3s step-end infinite alternate;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes cursor-blink {
  50% {
    border-color: transparent;
  }
}

.g-container {
  position: relative;
  margin: 20vh auto;
  width: 33vw;
  height: 10vw;
  filter: blur(0.2vw) contrast(20);
}

.g-view {
  top: 0;
  left: 0;
  // transform: translate(-50%, -50%) rotate(0deg) scale(1);
  position: absolute;
  overflow: hidden;
  font-size: 6vw;
  height: 10vw;
  background: #000;
  mix-blend-mode: screen;
}

.g-text {
  top: 0;
  left: 0;
  position: absolute;
  width: 33vw;
  color: #fff;
  // text-align: center;
}

// @for $i from 0 through $count {
//   .g-view:nth-child(#{$i}) {
//     width: #{$i * 3}vw;
//     animation: rotate 2s ease-in-out #{$i * 80}ms forwards;
//     z-index: 10 - $i;
//     $j: $i - 1;
//     &::before {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: #{$j * 3}vw;
//       height: 10vw;
//       background: #000;
//       z-index: 1;
//     }
//   }
// }
@keyframes rotate {
  0% {
    transform: translate(0) rotate(0deg) scaleX(1) skewX(0) skewY(0);
  }
  50% {
    transform: translate(40vw, 20vh) rotate(-180deg) scaleX(1.5) skewX(40deg)
      skewY(-20deg);
  }
  100% {
    transform: translate(0vw) rotate(-360deg) scaleX(1) skewX(0) skewY(0);
  }
}

@keyframes move {
  100% {
    transform: translate(0, 4vw);
  }
}
</style>
