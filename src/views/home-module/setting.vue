<template>
  <div class="page-container">
    <div class="main-container">
      <div>
        name：
        <input v-model="userInfo.name" disabled>
      </div>
      <div>
        avator：
        <img width="40px" :src="userInfo.avator">
      </div>
      <div>
        个性签名：
        <input v-text="userInfo.bio" v-model="userBio">
      </div>
      <div>
        <button @click="cancleModify()">取消</button>
        <button @click="modifyUser()">修改</button>
      </div>
      <div class="blogs-con">
        <div class="blog" v-for="blog in blogs" :key="blog.id">
          <el-card>
            <div class="card-content">
              <user-icon :uavator="blog.uavator" :uname="blog.uname" :ubio="blog.moment"></user-icon>
              <div class="blog-content">
                <p class="card-text">
                  <span>{{blog.content}}</span>
                </p>
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
            </div>
          </el-card>
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { modifyBioApi } from "@/api/login";
import { getBlogsByUserApi } from "@/api/blog";
export default {
  data() {
    return {
      userBio: "",
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
        blog.images = blog.images ? blog.images.split(",") : "";
      });
      this.blogs = blogs;
    });
  },
  methods: {
    modifyUser() {
      const userid = this.userInfo.id;
      modifyBioApi({ userid, bio: this.userBio });
    },
    cancleModify() {}
  }
};
</script>

<style lang="scss" scoped>
$images: "../../assets/images/";
.main-container {
  color: #333;
  display: flex;
  flex-direction: column;
  // flex test wrap

  .blogs-con {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
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
  }
}
</style>


