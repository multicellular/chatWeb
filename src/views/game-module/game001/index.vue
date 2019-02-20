<template>
  <div>
    <div class="introduce">
      <p class="title">游戏规则：</p>
      <ul>
        <li>1. 大鱼跟着鼠标的位置移动而吃到果实，如吃到红色果实，身体变红，画布下方的个数加1；如吃到蓝色果实，身体变蓝，画布下方的倍数加1。</li>
        <li>2. 画布右上角显示着小鱼的体力值，初始为10，身体为红色，随着时间的推移，体力值减小，身体颜色变淡。</li>
        <li>3. 大鱼吃到果实之后可以喂小鱼，此时小鱼的体力值会根据大鱼果实的数量相应增加，画布上方的分值等于画布下方的倍数乘以个数的累加和。</li>
        <li>4. 当小鱼体力值减到0时，游戏结束；点击画布，则可重新开始游戏。好了，拯救小鱼行动开始，躁起来吧！</li>
      </ul>
    </div>
    <div class="page">
      <div class="content" id="main">
        <canvas id="canvas1" width="800" height="600"></canvas>
        <canvas id="canvas2" width="800" height="600"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
  }
};
</script>
<style lang="scss" scoped>
.introduce {
  width: 800px;
  height: 100px;
  margin: 0 auto;
  padding-top: 10px;
}
.introduce p.title {
  width: 800px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
.introduce ul {
  width: 800px;
  margin: 6px 0;
}
.introduce ul li {
  width: 800px;
  height: 20px;
  line-height: 20px;
}

.page {
  width: 800px;
  height: 600px;
  margin: 0px auto;
  margin-top: 6px;
}
#main {
  width: 800px;
  height: 600px;
  position: relative;
}
#canvas1,
#canvas2 {
  width: 800px;
  height: 600px;
  position: absolute;
  left: 0;
  top: 0;
}
#canvas1 {
  z-index: 1;
}
#canvas2 {
  z-index: 0;
}
</style>

