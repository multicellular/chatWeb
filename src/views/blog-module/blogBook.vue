<template>
  <div class="page-container" :style="bgStyle" ref="pageContainer">
    <div class="bg-mask"></div>
    <nav class="page-nav">
      <i class="el-icon-menu"></i>
      <span class="nav-menu" @click="$router.push('/chat')">chat</span>
      <span class="nav-menu" @click="$router.push('/home')">home</span>
      <div>
        <button @click="clickPostBlog">postBlog</button>
      </div>
    </nav>
    <div class="main-container" ref="blogMain" @scroll="bgScroll()">
      <div class="blogs-con" id="blogs-con">
        <el-row class="blog-row" v-for="blog in blogs" :key="blog.id">
          <el-card>
            <div class="card-content">
              <div class="blog-header">
                <img class="card-avatar" :src="blog.uavator">
                <div class="card-title-con">
                  <div class="card-title">{{blog.uname}}</div>
                  <div class="card-subtitle">{{blog.moment}}</div>
                </div>
              </div>
              <div class="forward-comment" v-if="blog.forwardObj && blog.forwardObj.source_id">
                <p class="card-title">{{blog.forwardObj.forward_comment}}</p>
              </div>
              <div
                class="blog-content"
                :class="{'is-forward': blog.forwardObj && blog.forwardObj.source_id}"
              >
                <div class="card-text">
                  <span
                    class="card-text-name"
                    v-if="blog.forwardObj && blog.forwardObj.source_id"
                  >{{'@'+blog.forwardObj.source_uname}}</span>
                  <span>{{blog.content}}</span>
                </div>
                <div class="card-image-con">
                  <div class="card-image">
                    <img v-for="image in blog.images" :key="image" :src="image">
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <span>
                <icon-svg iconClass="post_blog" @click.native="clickForwardBlog(blog)"></icon-svg>
                <span class="icon-number">{{blog.forwards}}</span>
              </span>
              <span>
                <!-- 弹窗形式 -->
                <!-- <icon-svg iconClass="comment" @click.native="clickGetComments(blog)"></icon-svg> -->
                <!-- 展开形式 -->
                <icon-svg iconClass="comment" @click.native="showBlogComments(blog)"></icon-svg>
                <span class="icon-number">{{blog.comments}}</span>
              </span>
              <span>
                <icon-svg iconClass="share"></icon-svg>
                <!-- <span class="icon-number">{{blog.shares}}</span> -->
              </span>
            </div>
            <div
              class="card-comments"
              v-show="blog.isShowBlogComments"
              v-loading="blog.isShowCommentsLoading"
            >
              <div>
                content
                <textarea v-model="blog.blogCommentContent"></textarea>
                <button @click="postBlogComment(blog)">post</button>
              </div>
              <div class="blog-comments">
                <div class="comment" v-for="comment in blog.blogComments" :key="comment.id">
                  <div class="comment-header">
                    <img :src="comment.uavator">
                    <span>
                      <span class="comment-uname">{{comment.uname}}</span>
                      <span class="comment-moment">{{comment.moment}}</span>
                    </span>
                  </div>
                  <div class="comment-content">{{comment.content}}</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-row>
      </div>
    </div>
    <el-dialog :visible.sync="isPostBlog">
      <div class="postBlogDialog">
        <!-- <div>
          title
          <input v-model="blogFromData.title">
        </div>-->
        <div>
          content
          <textarea v-model="blogFromData.content"></textarea>
        </div>
        <div>
          <div>
            <img v-for="image in uploadImages" :key="image" :src="image">
          </div>images
          <input type="file" @change="uploadImage">
        </div>
        <div>
          <button @click="postBlog">post</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isPostComment">
      <div class="postCommentDialog">
        <div>
          content
          <textarea v-model="commentContent"></textarea>
        </div>
        <div>
          <button @click="postComment">post</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isShowComments">
      <div class="blog-comments">
        <div class="comment" v-for="comment in comments" :key="comment.id">
          <span>{{comment.uname}}</span>
          <img :src="comment.uavator">
          <p>{{comment.content}}</p>
        </div>
      </div>
      <div>
        <button @click="clickPostComment()">postComment</button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isForwardBlog">
      <div class="forward-blog">
        <div>
          comment
          <textarea v-model="forwardBlogComment"></textarea>
        </div>
        <div class="card-content" v-if="selectBlog">
          <p class="card-title">{{selectBlog.title}}</p>
          <p class="card-text">{{selectBlog.content}}</p>
          <div class="card-image-con">
            <div class="card-image">
              <img v-for="image in selectBlog.images" :key="image" :src="image">
            </div>
          </div>
        </div>
      </div>
      <div>
        <button @click="forwardBlog()">forward</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import html2canvas from "html2canvas";
import {
  getBlogsApi,
  getCommentsApi,
  postBlogApi,
  postCommentApi
} from "@/api/blog";
export default {
  data() {
    return {
      bgStyle: {},
      blogs: [],
      comments: [],
      blogFromData: {},
      uploadImages: [],
      commentContent: [],
      selectBlog: {},
      isPostComment: false,
      isPostBlog: false,
      isForwardBlog: false,
      isShowComments: false,
      forwardBlogComment: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    // this.getBgImg();
    this.initPage();
  },
  methods: {
    initPage() {
      getBlogsApi().then(({ blogs }) => {
        blogs.forEach(blog => {
          blog.images = blog.images ? blog.images.split(",") : "";
        });
        this.blogs = blogs;
      });
    },
    clickPostBlog() {
      this.isPostBlog = true;
    },
    postBlog() {
      const { title, content } = this.blogFromData;
      const { avator: uavator, name: uname, id: uid } = this.user.userInfo;
      postBlogApi({
        title,
        content,
        images: this.uploadImages,
        uavator,
        uname,
        uid
      }).then(({ blog }) => {
        blog.moment = blog.moment ? blog.moment : Date.now();
        blog.images = blog.images ? blog.images.split(",") : "";
        this.blogs.push(blog);
        this.isPostBlog = false;
      });
    },
    clickForwardBlog(blog) {
      this.isForwardBlog = true;
      this.selectBlog = blog;
    },
    forwardBlog() {
      // forwardObj={ source_uname, source_uid, source_uavator, forward_comment, source_id }
      const {
        title,
        content,
        images,
        id: source_id,
        uname: source_uname,
        uavator: source_uavator,
        uid: source_uid
      } = this.selectBlog;
      const { avator: uavator, name: uname, id: uid } = this.user.userInfo;
      postBlogApi({
        title,
        content,
        images: images ? images.join(",") : "", // iamges数据库存储为string，本地展示为array
        uavator,
        uname,
        uid,
        forwardObj: {
          source_id,
          source_uname,
          source_uavator,
          source_uid,
          forward_comment: this.forwardBlogComment
        }
      }).then(({ blog }) => {
        blog.moment = blog.moment ? blog.moment : Date.now();
        blog.images = blog.images ? blog.images.split(",") : "";
        this.blogs.push(blog);
        this.isForwardBlog = false;
        this.selectBlog.forwards = parseInt(this.selectBlog.forwards) + 1;
      });
    },
    clickGetComments(blog) {
      this.isShowComments = true;
      this.selectBlog = blog;
      getCommentsApi(blog.id).then(({ comments }) => {
        this.comments = comments;
      });
    },
    clickPostComment() {
      this.isPostComment = true;
    },
    postComment() {
      const blogid = this.selectBlog.id;
      const { avator: uavator, name: uname, id: uid } = this.user.userInfo;
      postCommentApi({
        blogid,
        content: this.commentContent,
        uname,
        uid,
        uavator
      }).then(({ comment }) => {
        comment.moment = Data.now();
        this.comments.push(comment);
        this.selectBlog.comments = parseInt(this.selectBlog.comments) + 1;
        this.isPostComment = false;
      });
    },
    showBlogComments(blog) {
      this.$set(blog, "isShowBlogComments", !blog.isShowBlogComments);
      if (blog.isShowBlogComments) {
        this.$set(blog, "isShowCommentsLoading", true);
        getCommentsApi(blog.id).then(({ comments }) => {
          blog.blogComments = comments;
          this.$set(blog, "isShowCommentsLoading", false);
        });
      }
    },
    postBlogComment(blog) {
      const { avator: uavator, name: uname, id: uid } = this.user.userInfo;
      postCommentApi({
        blogid: blog.id,
        content: blog.blogCommentContent,
        uname,
        uid,
        uavator
      }).then(({ comment }) => {
        comment.moment = Date.now();
        blog.blogComments.push(comment);
        blog.comments = parseInt(blog.comments) + 1;
        blog.blogCommentContent = "";
      });
    },
    uploadImage(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const _this = this;
      reader.onload = function() {
        _this.uploadImages.push(reader.result);
      };
      e.target.value = "";
    },
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
    width: 100%;
    margin: auto;
    z-index: 2;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
  }
  .postBlogDialog {
    background-color: #fff;
    z-index: 2;
  }
  .postCommentDialog {
    background-color: #fff;
    z-index: 2;
  }
}

.main-container {
  .blogs-con {
    .blog-row {
      margin-bottom: 20px;
    }
    .card-content {
      .blog-header {
        display: flex;
        align-items: center;
        .card-avatar {
          width: 40px;
          margin-right: 12px;
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2e3135;
        }
        .card-subtitle {
          font-size: 13px;
          color: #8a9aa9;
        }
      }
      .blog-content {
        padding: 12px 0px;
        min-height: 100px;
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
    .card-footer {
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .icon-number {
        font-size: 10px;
        margin-left: 2px;
      }
    }
  }
}
</style>