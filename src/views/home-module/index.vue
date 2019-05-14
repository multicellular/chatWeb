<template>
  <div id="home-module" class="module-container">
    <router-view/>
    <!-- <footer class="footer-wrapper">
      <div class="el-icon-con">
        <i class="el-icon-upload"></i>
        <i class="el-icon-location"></i>
        <i class="el-icon-question"></i>
      </div>
      <div></div>
    </footer>-->
  </div>
</template>

<script>
export default {
  name: "home-module",
};
</script>

<style lang="scss" scoped>
#home-module {
  // padding: 10px;
  // background-color: #ffef00;
  // min-height: 100%;
  // display: flex;
  // flex-direction: column;
  // flex: auto;
  height: 100%;
}
.module-container {
  background-color: #f6f7f9;
  .other-item {
    background-color: #ffef00;
  }
}
.footer-wrapper {
  max-width: 1200px;
  margin: auto;
  display: flex;
  height: 80px;
  align-items: center;
  .el-icon-con i {
    font-size: 24px;
    margin-right: 20px;
  }
}
</style>
