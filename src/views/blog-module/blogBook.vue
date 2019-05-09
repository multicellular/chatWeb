<template>
  <div class="page-container" :style="bgStyle" ref="pageContainer">
    <div class="bg-mask"></div>
    <div class="main-container">
      <div class="blogs-con" id="blogs-con" ref="blogMain" @scroll="handleScroll()">
        <el-row class="blog-row" v-for="(blog,index) in blogs" :key="blog.id">
          <el-card>
            <div class="card-content">
              <user-icon :uavator="blog.uavator" :uname="blog.uname" :ubio="blog.moment">
                <div class="operation-con">
                  <button
                    v-if="blog.uid==user.userInfo.id"
                    @click="deleteBlog(blog.id,index)"
                  >delete blog</button>
                </div>
              </user-icon>
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
              <div class="post-comment">
                <textarea class="edit-textarea" v-model="blog.blogCommentContent"></textarea>
                <button @click="postBlogComment(blog)">post</button>
              </div>
              <div class="blog-comments">
                <div class="comment" v-for="comment in blog.blogComments" :key="comment.id">
                  <div class="avatar-con">
                    <img class="comment-avatar" :src="comment.uavator">
                  </div>
                  <div class="comment-con">
                    <div class="comment-uname">{{comment.uname}}</div>
                    <div class="comment-moment">{{comment.moment}}</div>
                    <div class="comment-content">{{comment.content}}</div>
                  </div>
                  <!-- <user-icon :uavator="comment.uavator" :uname="comment.uname" :ubio="comment.moment"></user-icon> -->
                </div>
              </div>
            </div>
          </el-card>
        </el-row>
      </div>
    </div>
    <el-dialog :visible.sync="isPostBlog" title="postBlogDialog">
      <div class="postBlogDialog">
        <button @click="postBlog">post</button>
        <!-- <div>
          title
          <input v-model="blogFromData.title">
        </div>-->
        <div>
          <textarea class="edit-textarea" v-model="blogFromData.content"></textarea>
        </div>
        <div class="images-con">
          <div class="image-con" v-for="(image, idx) in blogFromData.uploadImages" :key="idx">
            <img class="upload-image" :src="image">
            <img
              class="delete-image"
              @click="deleteUploadImage(idx)"
              src="@/assets/images/delete.png"
            >
          </div>
          <div class="image-con" v-if="blogFromData.uploadVideo">
            <video
              class="upload-image"
              :src="blogFromData.uploadVideo"
              controls="controls"
              id="uploadVideo"
              @play="videoPlay('uploadVideo')"
            ></video>
            <img class="delete-image" @click="deleteUploadVideo" src="@/assets/images/delete.png">
          </div>
        </div>
        <div class="btns-con">
          <label
            for="uploadImage"
            @click.stop
            v-show="!(blogFromData.uploadImages.length > 8 || blogFromData.uploadVideo)"
          >
            <input class="upload-input" type="file" @change="uploadImage">上传图片
          </label>
          <label
            for="uploadVideo"
            @click.stop
            v-show="!(blogFromData.uploadImages.length > 0 || blogFromData.uploadVideo)"
          >
            <input class="upload-input" type="file" @change="uploadVideo">上传视频
          </label>
          <label for="isPrivate" @click.stop>
            <input type="checkbox" id="isPrivate" v-model="blogFromData.is_private">不公开发布
          </label>
          <div class="emoji-con"></div>
        </div>
      </div>
    </el-dialog>
    <!-- <el-dialog :visible.sync="isPostComment">
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
          <user-icon :uavator="comment.uavator" :uname="comment.uname" :ubio="blog.moment"></user-icon>
          <p>{{comment.content}}</p>
        </div>
      </div>
      <div>
        <button @click="clickPostComment()">postComment</button>
      </div>
    </el-dialog>-->
    <el-dialog :visible.sync="isForwardBlog" :title="'Forward Blog'">
      <div class="forwardBlogDialog blogs-con">
        <button class="forward-btn" @click="forwardBlog()">forward</button>
        <div>
          <textarea class="edit-textarea" v-model="forwardBlogComment"></textarea>
        </div>
        <div class="card-content" v-if="selectBlog">
          <!-- <div class="blog-header">
            <p class="card-title">{{selectBlog.title}}</p>
          </div>-->
          <div class="blog-content">
            <p class="card-text">
              <span>{{selectBlog.content}}</span>
            </p>
            <div v-if="selectBlog.media_type==='image'">
              <div class="card-image-con" v-if="selectBlog.images">
                <div class="card-image" v-for="image in selectBlog.images.slice(0,4)" :key="image">
                  <img :src="image">
                </div>
              </div>
              <div class="card-image-con" v-if="selectBlog.images && selectBlog.images.length > 4">
                <div class="card-image" v-for="image in selectBlog.images.slice(4,8)" :key="image">
                  <img :src="image">
                </div>
              </div>
            </div>
            <div v-else-if="selectBlog.media_type==='video'">
              <div class="card-video-con">
                <video
                  :src="selectBlog.video"
                  width="320"
                  height="240"
                  controls="controls"
                  id="forwardVideo"
                  @play="videoPlay('forwardVideo')"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { uploadFile } from "@/api/public";
// import html2canvas from "html2canvas";
/* global GLOBAL */
import lrz from "lrz";
import {
  getBlogsApi,
  getCommentsApi,
  postBlogApi,
  postCommentApi,
  deleteBlogApi
} from "@/api/blog";

export default {
  data() {
    return {
      bgStyle: {},
      blogs: [],
      comments: [],
      blogFromData: {
        title: "",
        content: "",
        is_private: false,
        uploadImages: [],
        uploadVideo: "",
        files: []
      },
      commentContent: [],
      selectBlog: {},
      // isPostComment: false,
      isPostBlog: false,
      isForwardBlog: false,
      // isShowComments: false,
      forwardBlogComment: "",
      curPlayVideoId: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    // this.getBgImg();
    this.initPage();
    GLOBAL.vbus.$on("clickPostBlog", () => {
      this.clickPostBlog();
    });
  },
  methods: {
    initPage() {
      getBlogsApi().then(({ blogs }) => {
        blogs.forEach(blog => {
          if (blog.media_type === "image") {
            blog.images = blog.media_urls ? blog.media_urls.split(",") : "";
          } else if (blog.media_type === "video") {
            blog.video = blog.media_urls;
          }
        });
        this.blogs = blogs;
      });
    },
    clickPostBlog() {
      this.isPostBlog = true;
    },
    hidePostBlog() {
      this.isPostBlog = false;
      this.blogFromData = {
        title: "",
        content: "",
        is_private: false,
        uploadImages: [],
        uploadVideo: "",
        files: []
      };
    },
    async postBlog() {
      const {
        title,
        content,
        files,
        is_private,
        uploadVideo
      } = this.blogFromData;
      const { id: uid } = this.user.userInfo;
      let media_type = "image";
      let media_urls = "";
      let responseObj;
      let formData = new FormData();
      const fileLen = files ? files.length : 0;
      if (fileLen > 0) {
        if (uploadVideo) {
          media_type = "video";
        }
        for (let i = 0; i < files.length; i++) {
          formData.append("file", files[i],'blog.jpeg');
        }
        try {
          responseObj = await uploadFile(formData);
          media_urls = responseObj.urls;
        } catch (err) {
          // eslint-disable-next-line
          console.log("uploadErr:", err);
        }
      }

      postBlogApi({
        title,
        content,
        media_type,
        media_urls,
        uid,
        is_private
      }).then(({ blog }) => {
        if (blog.media_type === "image") {
          blog.images = blog.media_urls ? blog.media_urls.split(",") : "";
        } else if (blog.media_type === "video") {
          blog.video = blog.media_urls;
        }
        this.blogs.push(blog);
        this.hidePostBlog();
      });
    },
    clickForwardBlog(blog) {
      this.isForwardBlog = true;
      this.selectBlog = blog;
    },
    forwardBlog() {
      // { title, content, images, uid, forward_comment, source_id }
      const {
        id,
        forwardObj: { source_id }
      } = this.selectBlog;
      const { id: uid } = this.user.userInfo;
      postBlogApi({
        uid,
        forward_comment: this.forwardBlogComment,
        source_id: source_id || id
      }).then(({ blog }) => {
        if (blog.media_type === "image") {
          blog.images = blog.media_urls ? blog.media_urls.split(",") : "";
        } else if (blog.media_type === "video") {
          blog.video = blog.media_urls;
        }
        this.blogs.push(blog);
        this.isForwardBlog = false;
        this.selectBlog.forwards = parseInt(this.selectBlog.forwards) + 1;
      });
    },
    deleteBlog(blogid, index) {
      deleteBlogApi(blogid).then(() => {
        this.blogs.splice(index, 1);
        this.$message({
          message: "操作成功",
          type: "success"
        });
      });
    },
    // clickGetComments(blog) {
    //   this.isShowComments = true;
    //   this.selectBlog = blog;
    //   getCommentsApi(blog.id).then(({ comments }) => {
    //     this.comments = comments;
    //   });
    // },
    // clickPostComment() {
    //   this.isPostComment = true;
    // },
    // postComment() {
    //   const blogid = this.selectBlog.id;
    //   const { id: uid } = this.user.userInfo;
    //   postCommentApi({
    //     blogid,
    //     content: this.commentContent,
    //     uid
    //   }).then(({ comment }) => {
    //     comment.moment = Date.now();
    //     this.comments.push(comment);
    //     this.selectBlog.comments = parseInt(this.selectBlog.comments) + 1;
    //     this.isPostComment = false;
    //   });
    // },
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
      const { id: uid } = this.user.userInfo;
      postCommentApi({
        blogid: blog.id,
        content: blog.blogCommentContent,
        uid
      }).then(({ comment }) => {
        // comment.moment = Date.now();
        blog.blogComments.push(comment);
        blog.comments = parseInt(blog.comments) + 1;
        blog.blogCommentContent = "";
      });
    },
    uploadImage(e) {
      const file = e.target.files[0];
      lrz(file, { width: 270 })
        .then(result => {
          // result.formData;
          if (!this.blogFromData.files) {
            this.blogFromData.files = [];
          }
          this.blogFromData.files.push(result.file); //压缩后的file对象
          this.blogFromData.uploadImages.push(result.base64);
        })
        .always(() => {
          e.target.value = "";
        });
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // const _this = this;
      // reader.onload = function() {
      //   _this.blogFromData.uploadImages.push(reader.result);
      //   if (!_this.blogFromData.files) {
      //     _this.blogFromData.files = [];
      //   }
      //   _this.blogFromData.files.push(file);
      // };
      // e.target.value = "";
    },
    deleteUploadImage(idx) {
      this.blogFromData.uploadImages.splice(idx, 1);
      this.blogFromData.files.splice(idx, 1);
    },
    uploadVideo(e) {
      const file = e.target.files[0];
      this.blogFromData.uploadVideo = URL.createObjectURL(file);
      this.blogFromData.files = [file];
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // const _this = this;
      // reader.onload = function() {
      //   _this.blogFromData.uploadVideo = reader.result;
      //   _this.blogFromData.files = [file];
      // };
      e.target.value = "";
    },
    deleteUploadVideo() {
      this.blogFromData.uploadVideo = "";
      this.blogFromData.files = [];
    },
    videoPlay(id) {
      if (this.curPlayVideoId && this.curPlayVideoId !== id) {
        const curPlayVideo = document.getElementById(this.curPlayVideoId);
        curPlayVideo.pause();
      }
      this.curPlayVideoId = id;
    },
    handleScroll() {
      if (this.curPlayVideoId) {
        const curPlayVideo = document.getElementById(this.curPlayVideoId);
        curPlayVideo.pause();
        this.curPlayVideoId = "";
      }
    }
    // getBgImg() {
    //   html2canvas(document.getElementById("blogs-con"), {
    //     logging: false
    //   }).then(
    //     canvas => {
    //       const url = canvas.toDataURL("image/png");
    //       this.$refs.pageContainer.style.backgroundImage = "url(" + url + ")";
    //       // this.bgStyle = {
    //       //   "background-image": "url(" + url + ")"
    //       // };
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
    // bgScroll() {
    //   const scrollTop = this.$refs.blogMain.scrollTop;
    //   const positionTop = -scrollTop * (100 / (100 - 10 - 8 - 10));
    //   // const imageUrl = this.bgStyle["background-image"];
    //   this.bgStyle = {
    //     // "background-image": imageUrl,
    //     "background-position-y": positionTop + "px"
    //   };
    // }
  }
};
</script>

<style lang="scss" scoped>
$images: "../../assets/images/";
.page-container {
  height: 90%;
  // padding: 2vh 20%;
  position: relative;
  // background-repeat: no-repeat;
  // background-size: 1000px;
  // background-position-x: center;
  overflow-x: hidden;
  overflow-y: auto;
  .bg-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: #eef2f7f5;
    // background-image: url($images+"bg001.jpg");
    opacity: 0.95;
  }
  .main-container {
    // max-width: 700px;
    height: 100%;
    // width: 100%;
    position: relative;
    // margin: auto;
    // z-index: 2;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .blogs-con {
      flex: auto;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
  .postBlogDialog {
    background-color: #fff;
    z-index: 2;
    .edit-textarea {
      resize: none;
      height: 80px;
      width: 100%;
      margin: 8px;
    }
    .upload-input {
      width: 62px;
    }
    .images-con {
      display: flex;
      flex-wrap: wrap;
      max-width: 100%;
      .image-con {
        position: relative;
        padding: 5px;
        border: 1px solid #f1e3e3;
        margin: 0px 8px;
        width: 150px;
        height: 200px;
        .upload-image {
          max-height: 200px;
          min-height: 40px;
          max-width: 100%;
        }
        .delete-image {
          width: 20px;
          position: absolute;
          width: 20px;
          right: 0px;
          top: 0px;
          z-index: 2;
        }
      }
    }
    .btns-con {
      margin: 8px;
    }
  }
}
.forwardBlogDialog {
  .forward-btn {
    float: right;
    margin-bottom: 12px;
  }
  .edit-textarea {
    resize: none;
    height: 60px;
    width: 100%;
  }
}

.blogs-con {
  .blog-row {
    margin-bottom: 20px;
  }
  .card-content {
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
  .card-comments {
    padding: 8px 20px;
    background-color: aliceblue;
    .post-comment {
      display: flex;
      .edit-textarea {
        resize: none;
        flex: 1;
      }
    }
    .comment {
      margin: 8px 0px;
      display: flex;
      .avatar-con {
        margin-top: 16px;
        margin-right: 12px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        overflow: hidden;
        .comment-avatar {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .comment-con {
        .comment-uname {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2e3135;
        }
        .comment-moment {
          font-size: 13px;
          color: #8a9aa9;
        }
      }
    }
  }
}
</style>