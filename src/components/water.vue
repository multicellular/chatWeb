<template>
  <div class="water-bg">
    <span ref="water" class="water">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'water',
  data() {
    return {
    };
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.water-bg {
  // filter: blur(3px) contrast(10);
}
.water {
    position: relative;
    // width: 640px;
    // height: 106px;
    // color: #fff;
    // font-size: 124px;
    // text-align: center;
    // margin: 100px auto;
    border-bottom: 10px solid #9ad7fe;
    transform: skewY(5deg);
    
    &::before {
        position: absolute;
        content: "";
        bottom : -20px;
        width: 10px;
        height: 20px;
        border-radius: 50%;
        background: #9ad7fe;
        transform: translate(0, 0);
        animation: move 15s ease-in-out infinite;
    }
    
    &::after {
        position: absolute;
        content: "";
        left: 0;
        bottom : -20px;
        width: 10px;
        height: 20px;
        border-radius: 50%;
        background: #9ad7fe;
        transform: translate(0, 0);
        animation: move 15s ease-in-out 2s infinite;
    }
}

@keyframes move {
    80% {        
        bottom : -30px;
        transform: translate(623px, 0);
    } 93% {
        transform: translate(623px, 3px);
        opacity: 1;
    }100% {
        transform: translate(623px, 150px);
        opacity: 0;
    }
}
</style>
