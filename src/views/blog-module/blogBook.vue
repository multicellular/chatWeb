<template>
  <div class="page-container">
    <div class="main-container">
      <div class="blogs-con">
        <el-row>
          <el-card>
            <div class="card-header">
              <img class="card-avatar" src="@/assets/images/logo.jpeg">
              <div class="card-title-con">
                <div class="card-subtitle">Card Subtitle</div>
                <div class="card-title">Card Title</div>
              </div>
            </div>
            <div class="card-content-con">
              <p class="card-text">
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
              </p>
              <div class="card-image-con">
                <div class="card-image">
                  <img src="@/assets/images/login_bg.png">
                </div>
              </div>
            </div>
          </el-card>
          <div class="blog-footer"></div>
        </el-row>
        <el-row>
          <el-card>
            <div class="card-header">
              <img class="card-avatar" src="@/assets/images/logo.jpeg">
              <div class="card-title-con">
                <div class="card-subtitle">Card Subtitle</div>
                <div class="card-title">Card Title</div>
              </div>
            </div>
            <div class="card-content-con">
              <p class="card-text">
                This is content, without any paragraph or header tags,
                within an ion-card-content element.
              </p>
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
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.main-container {
  .blogs-con {
    max-width: 640px;
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