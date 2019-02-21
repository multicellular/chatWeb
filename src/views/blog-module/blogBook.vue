<template>
  <div class="page-container" :style="bgStyle" ref="pageContainer">
    <div class="bg-mask"></div>
    <nav class="page-nav">
      <i class="el-icon-menu"></i>
      <span class="nav-menu" @click="$router.push('/chat')">chat</span>
      <span class="nav-menu" @click="$router.push('/home')">home</span>
    </nav>
    <div class="main-container" ref="blogMain" @scroll="bgScroll()">
      <div class="blogs-con" id="blogs-con">
        <el-row class="blog-row">
          <el-card>
            <div class="card-header">
              <img class="card-avatar" src="@/assets/images/logo.jpeg">
              <div class="card-title-con">
                <div class="card-subtitle">Card Subtitle</div>
                <div class="card-title">Card Title</div>
              </div>
            </div>
            <div class="card-content-con">
              <p
                class="card-text"
              >Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean.</p>
              <div class="card-image-con">
                <div class="card-image">
                  <img src="@/assets/images/login_bg.png">
                </div>
              </div>
            </div>
          </el-card>
          <div class="blog-footer"></div>
        </el-row>
        <el-row class="blog-row">
          <el-card>
            <div class="card-header">
              <img class="card-avatar" src="@/assets/images/logo.jpeg">
              <div class="card-title-con">
                <div class="card-subtitle">Card Subtitle</div>
                <div class="card-title">Card Title</div>
              </div>
            </div>
            <div class="card-content-con">
              <p
                class="card-text"
              >This is content, without any paragraph or header tags, within an ion-card-content element.</p>
              <div class="card-image-con">
                <div class="card-image">
                  <img src="@/assets/images/login_bg.png">
                </div>
                <div class="card-image">
                  <img src="@/assets/images/home_bg.jpeg">
                </div>
                <!-- <img class="card-image" src="@/assets/images/login_bg.png">
                <img class="card-image" src="@/assets/images/home_bg.jpeg">-->
              </div>
            </div>
          </el-card>
          <div class="blog-footer"></div>
        </el-row>
        <el-row class="blog-row">
          <el-card>
            <div class="card-header">
              <img class="card-avatar" src="@/assets/images/logo.jpeg">
              <div class="card-title-con">
                <div class="card-subtitle">Card Subtitle</div>
                <div class="card-title">Card Title</div>
              </div>
            </div>
            <div class="card-content-con">
              <p
                class="card-text"
              >This is content, without any paragraph or header tags, within an ion-card-content element.</p>
              <div class="card-image-con">
                <div class="card-image">
                  <img src="@/assets/images/login_bg.png">
                </div>
                <div class="card-image">
                  <img src="@/assets/images/home_bg.jpeg">
                </div>
                <!-- <img class="card-image" src="@/assets/images/login_bg.png">
                <img class="card-image" src="@/assets/images/home_bg.jpeg">-->
              </div>
            </div>
          </el-card>
          <div class="blog-footer"></div>
        </el-row>
        <el-row class="blog-row">
          <el-card>
            <div class="card-header">
              <img class="card-avatar" src="@/assets/images/logo.jpeg">
              <div class="card-title-con">
                <div class="card-subtitle">Card Subtitle</div>
                <div class="card-title">Card Title</div>
              </div>
            </div>
            <div class="card-content-con">
              <p
                class="card-text"
              >This is content, without any paragraph or header tags, within an ion-card-content element.</p>
              <div class="card-image-con">
                <div class="card-image">
                  <img src="@/assets/images/login_bg.png">
                </div>
                <div class="card-image">
                  <img src="@/assets/images/home_bg.jpeg">
                </div>
                <!-- <img class="card-image" src="@/assets/images/login_bg.png">
                <img class="card-image" src="@/assets/images/home_bg.jpeg">-->
              </div>
            </div>
          </el-card>
          <div class="blog-footer"></div>
        </el-row>
        <el-row class="blog-row">
          <el-card>
            <div class="card-header">
              <img class="card-avatar" src="@/assets/images/logo.jpeg">
              <div class="card-title-con">
                <div class="card-subtitle">Card Subtitle</div>
                <div class="card-title">Card Title</div>
              </div>
            </div>
            <div class="card-content-con">
              <p
                class="card-text"
              >This is content, without any paragraph or header tags, within an ion-card-content element.</p>
              <div class="card-image-con">
                <div class="card-image">
                  <img src="@/assets/images/login_bg.png">
                </div>
                <div class="card-image">
                  <img src="@/assets/images/home_bg.jpeg">
                </div>
                <!-- <img class="card-image" src="@/assets/images/login_bg.png">
                <img class="card-image" src="@/assets/images/home_bg.jpeg">-->
              </div>
            </div>
          </el-card>
          <div class="blog-footer"></div>
        </el-row>
        <el-row class="blog-row">
          <el-card>
            <div class="card-header">
              <img class="card-avatar" src="@/assets/images/logo.jpeg">
              <div class="card-title-con">
                <div class="card-subtitle">Card Subtitle</div>
                <div class="card-title">Card Title</div>
              </div>
            </div>
            <div class="card-content-con">
              <p
                class="card-text"
              >This is content, without any paragraph or header tags, within an ion-card-content element.</p>
              <div class="card-image-con">
                <div class="card-image">
                  <img src="@/assets/images/login_bg.png">
                </div>
                <div class="card-image">
                  <img src="@/assets/images/home_bg.jpeg">
                </div>
                <!-- <img class="card-image" src="@/assets/images/login_bg.png">
                <img class="card-image" src="@/assets/images/home_bg.jpeg">-->
              </div>
            </div>
          </el-card>
          <div class="blog-footer"></div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      bgStyle: {}
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    this.getBgImg();
  },
  methods: {
    getBgImg() {
      html2canvas(document.getElementById("blogs-con"), {
        logging: false
      }).then(
        canvas => {
          const url = canvas.toDataURL("image/png");
          this.$refs.pageContainer.style.backgroundImage = "url(" + url + ")";
          // this.bgStyle = {
          //   "background-image": "url(" + url + ")"
          // };
        },
        err => {
          console.log(err);
        }
      );
    },
    bgScroll() {
      const scrollTop = this.$refs.blogMain.scrollTop;
      const positionTop = -scrollTop * (100 / (100 - 10 - 8 - 10));
      // const imageUrl = this.bgStyle["background-image"];
      this.bgStyle = {
        // "background-image": imageUrl,
        "background-position-y": positionTop + "px"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$images: "../../assets/images/";
.page-container {
  height: 100vh;
  padding: 10vh 20%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-repeat: no-repeat;
  background-size: 1000px;
  background-position-x: center;
  overflow-x: hidden;
  overflow-y: auto;
  .bg-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: #eef2f7f5;
    background-image: url($images+"bg001.jpg");
    opacity: 0.95;
  }
  .page-nav {
    width: 100%;
    margin: auto;
    min-height: 60px;
    display: flex;
    align-items: center;
    background-color: #fafbfcf2;
    max-width: 700px;
    z-index: 2;
    .el-icon-menu {
      font-size: 20px;
      margin-left: 16px;
    }
    .nav-menu {
      margin: 16px;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .main-container {
    max-width: 700px;
    margin: auto;
    z-index: 2;
    overflow-y: auto;
    background-color: #fff;
  }
}

.main-container {
  // height: 100%;

  .blogs-con {
    // padding: 50px;
    // max-width: 640px;
    .blog-row {
      margin-bottom: 20px;
    }
    .card-header {
      display: flex;
      align-items: center;
      .card-avatar {
        width: 40px;
        margin-right: 12px;
      }
      .card-subtitle {
        font-size: 1.25rem;
        font-weight: 600;
        color: #2e3135;
      }
      .card-title {
        font-size: 13px;
        color: #8a9aa9;
      }
    }
    .card-text {
      font-size: 15px;
      line-height: 1.6;
      white-space: pre-wrap;
      color: #17181a;
    }
    .card-image-con {
      display: flex;
      align-items: center;
      max-width: 100%;
      flex-wrap: nowrap;
      .card-image {
        flex: 1;
        overflow: hidden;
        margin: 0 8px;
        img {
          width: 100%;
        }
        // max-width: 100%;
        // width: 800px;
        // height: 100px;
      }
    }
  }
}
</style>