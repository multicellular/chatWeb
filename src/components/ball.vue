<template>
  <section class="stage" :class="size">
    <figure class="ball">
      <span class="eight">{{number}}</span>
    </figure>
  </section>
</template>

<script>
  export default {
    name: "Ball",
    props: {
      size: {
        default: 'small'
      },
      number: {
        default: '0'
      }
    },
    data() {
      return {};
    },
    mounted() {}
  };
</script>

<style lang="scss" scoped>
  .ball {
    display: inline-block;
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 50%;
    position: relative;
    background: radial-gradient(circle at 50% 120%, #6a2572, #8d3b8a 30%, #c16798 90%, #f0c04f 100%);
    box-shadow: 2px 6px 20px rgba(10, 1, 1, 0.8)
  }
  
  .ball:before {
    content: "";
    position: absolute;
    top: 1%;
    left: 5%;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 0px, #f2c34d, rgba(255, 255, 255, 0) 58%);
    -webkit-filter: blur(5px);
    z-index: 2;
  }
  
  .stage {
    display: inline-block;
    margin: 20px;
    -webkit-perspective: 1200px;
    -moz-perspective: 1200px;
    -ms-perspective: 1200px;
    -o-perspective: 1200px;
    perspective: 1200px;
    -webkit-perspective-origin: 50% 50%;
    -moz-perspective-origin: 50% 50%;
    -ms-perspective-origin: 50% 50%;
    -o-perspective-origin: 50% 50%;
    perspective-origin: 50% 50%;
  }
  
  .ball .eight {
    right: 0;
    left: 0;
    margin: auto;
    bottom: 0;
    width: 68%;
    height: 68%;
    top: 0;
    background: white;
    border-radius: 50%;
    position: absolute;
    z-index: 2;
    background: radial-gradient(circle at 30% 32%, #faf8fa, hsla(0, 0%, 100%, .61) 50%, #c393bd 70%, #c99dc4e6 70%);
    text-align: center;
    line-height: 1.5;
    font-weight: bold;
  }
  
  .small.stage {
    width: 80px;
    height: 80px;
    .eight {
      font-size: 40px;
    }
  }
  
  .normal.stage {
    width: 160px;
    height: 160px;
    .eight {
      font-size: 70px;
    }
  }
  
  .bigger.stage {
    width: 250px;
    height: 250px;
    .eight {
      font-size: 120px;
    }
  }
</style>
