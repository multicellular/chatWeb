<template>
  <div class="page-container">
    <div class="banner-container">
      <div class="radial-circle"></div>
      <auto-text text="welcome to home !" class="search-con"></auto-text>
    </div>
    <div class="main-container">
      <div>develop element-ui for web/flutter for mobile/node.js for server</div>
      <div>
        home-page logo 炫(背景canvas、动画) 导航(项目导航，扩展页面导航，游戏导航，模块链接导航) 精选(blog,news,话题,视频,音频，推送) 私人消息/留言 公告栏 聊天机器人
      </div>
      <div>pages 聊天页面/博客页面(好友，公共)/页面访问统计页面/游戏页面(单机，对战)/圈子页面(分类，问答，贴吧，资源，社会)/活动页面(红包)/项目应用(项目由开发者开发的兴趣网页)</div>
    </div>
  </div>
</template>

<script>
  import AutoText from "@/components/autoText";
  import {
    mapGetters
  } from "vuex";
  export default {
    components: {
      "auto-text": AutoText
    },
    computed: {
      ...mapGetters(["user"])
    }
  };
</script>

<style lang="scss" scoped>
  $images: "../../assets/images/";
  .banner-container {
    width: 100%;
    height: 400px;
    overflow: hidden;
    background-image: url($images+"home_map.jpeg");
    background-repeat: no-repeat;
    // background-size: cover;
    background-size: auto 100%;
    flex: auto;
    position: relative;
  }
  
  .search-con {
    position: absolute;
    left: 0;
    right: 0;
    top: 150px;
  }
  
  .radial-circle {
    position: absolute;
    top: -100%;
    left: -100%;
    right: -100%;
    bottom: -100%;
    background: radial-gradient( circle at 50% 50%, transparent 0%, transparent 3%, rgba(0, 0, 0, 0.5) 3.5%, rgba(0, 0, 0, 0.5) 100%);
    animation: move 10s infinite alternate;
  }
  
  @keyframes move {
    0% {
      transform: translateX(-10%);
    }
    100% {
      transform: translateX(10%);
    }
  }
</style>


