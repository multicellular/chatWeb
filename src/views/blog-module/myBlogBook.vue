<template>
  <div class="page-container">
    <div class="main-container">
      <div class="blogs-con">
        <div class="blog" v-for="blog in blogs" :key="blog.id">
          <el-card>
            <div class="card-content">
              <div class="blog-moment">{{blog.moment}}</div>
              <div class="forward-comment" v-if="blog.forwardObj && blog.forwardObj.source_id">
                <p class="card-title">{{blog.forwardObj.forward_comment}}</p>
              </div>
              <div
                class="blog-content"
                :class="{'is-forward': blog.forwardObj && blog.forwardObj.source_id}"
              >
                <p class="card-text">
                  <span
                    class="card-text-name"
                    v-if="blog.forwardObj && blog.forwardObj.source_id"
                  >{{'@'+blog.forwardObj.source_uname}}</span>
                  <span>{{blog.content}}</span>
                </p>
                <div v-if="blog.media_type==='image'">
                  <div class="card-image-con" v-if="blog.images">
                    <div class="card-image" v-for="image in blog.images.slice(0,4)" :key="image">
                      <img :src="image">
                    </div>
                  </div>
                  <div class="card-image-con" v-if="blog.images && blog.images.length > 4">
                    <div class="card-image" v-for="image in blog.images.slice(4,8)" :key="image">
                      <img :src="image">
                    </div>
                  </div>
                </div>
                <div v-else-if="blog.media_type==='video'">
                  <div class="card-video-con">
                    <video
                      :src="blog.video"
                      controls="controls"
                      :id="'main'+blog.id"
                      width="320"
                      height="240"
                      @play="videoPlay('main'+blog.id)"
                    ></video>
                  </div>
                </div>
                <div v-else>
                  <a :href="blog.media_urls" download="下载文件"></a>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="empty blog"></div>
        <div class="empty blog"></div>
        <div class="empty blog"></div>
        <div class="empty blog"></div>
        <div class="empty blog"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getBlogsByUserApi } from "@/api/blog";
/* global GLOBAL */
export default {
  data() {
    return {
      blogs: []
    };
  },
  computed: {
    ...mapGetters(["user"]),
    userInfo() {
      return this.user.userInfo || {};
    }
  },
  created() {
    getBlogsByUserApi(this.userInfo.id).then(({ blogs }) => {
      blogs.forEach(blog => {
        if (blog.media_type === "image") {
          blog.images = blog.media_urls ? blog.media_urls.split(",") : "";
        } else if (blog.media_type === "video") {
          blog.video = blog.media_urls;
        }
      });
      this.blogs = blogs;
    });
    GLOBAL.vbus.$on("clickPostBlog", () => {
      // this.clickPostBlog();
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
$images: "../../assets/images/";
.page-container {
  height: 90%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
}
.main-container {
  color: #333;
  display: flex;
  flex-direction: column;
  position: relative;
  // flex test wrap
  .page-nav {
    // width: 100%;
    // margin: auto;
    min-height: 60px;
    display: flex;
    align-items: center;
    background-color: #fafbfcf2;
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
  .blogs-con {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .blog {
      // width: 200px;
      max-width: 100%;
      margin-bottom: 12px;
    }
    .empty {
      height: 0px;
      overflow: hidden;
    }
  }

  .blog-content {
    min-height: 60px;
    &.is-forward {
      background-color: #f1f4f7;
      padding-left: 12px;
      padding-right: 12px;
    }
    .card-text {
      font-size: 15px;
      line-height: 1.6;
      white-space: pre-wrap;
      color: #17181a;
      .card-text-name {
        color: aqua;
      }
    }
    .card-image-con {
      display: flex;
      align-items: center;
      max-width: 100%;
      flex-wrap: nowrap;
      .card-image {
        flex: 1;
        // overflow: hidden;
        margin: 0 8px;
        img {
          max-width: 100%;
        }
      }
    }
    .card-video-con {
      video {
        max-width: 100%;
      }
    }
  }
}
</style>


