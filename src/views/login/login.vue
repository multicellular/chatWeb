<template>
  <div class="page-container" v-loading="isLoading">
    <div class="main-container">
      <div v-if="isShowLogin" class="login-container">
        <img class="avator-image" v-if="localUser.avator" :src="localUser.avator">
        <button @click="goSignUp" class="from-btn">Go Sign up</button>
        <div class="from-item">
          <span>name</span>
          <input placeholder="enter your account" v-model="userSignInName">
        </div>
        <div class="from-item">
          <span>password</span>
          <input placeholder="enter your account" type="password" v-model="userSignInPassword">
        </div>
        <div class="from-item from-btn">
          <button @click="signIn" class="from-btn">Sign in</button>
        </div>
        <div class="oauth-con">
          <div class="oauth-tip">请选择快捷登录方式</div>
          <div class="oauth-content">
            <a class="r-oauth" href="http://www.lovepean.xyz:3000/api/github_oauth">
              <img src="@/assets/images/github.png" class="oauth-icon">
              <span class="oauth-label">GitHub</span>
            </a>
          </div>
        </div>
      </div>
      <div v-else class="sign-up-container">
        <button class="from-btn" @click="goSignIn">Go Sign in</button>
        <div class="from-item">
          <span>name</span>
          <input placeholder="enter your account" v-model="userSignUpName">
        </div>
        <div class="from-item">
          <span>password</span>
          <input placeholder="enter your nick name" type="password" v-model="userSignUpPassword">
        </div>
        <div class="from-item">
          <span>avatar</span>
          <input type="file" @change="getAvatorUrl" ref="fileInput">
          <img :src="userAvatorUrl" width="50px">
        </div>
        <div class="from-item">
          <button class="from-btn" @click="signUp">Sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem, setItem } from "@/utils/storage";
import { signInApi, signUpApi } from "@/api/login";
import { uploadFile } from "@/api/public";
import lrz from "lrz";
export default {
  data() {
    return {
      isShowLogin: true,
      userSignInName: "",
      userSignInPassword: "",
      userSignUpName: "",
      userSignUpPassword: "",
      userAvatorUrl: "",
      isLoading: false,
      localUser: {},
      avatorFile: {}
    };
  },
  mounted() {
    this.localUser = getItem("userInfo", true) || {};
    this.userSignInName = this.localUser.name;
  },
  methods: {
    signIn() {
      if (!this.userSignInName || !this.userSignInPassword) {
        return;
      }
      this.isLoading = true;
      signInApi({
        name: this.userSignInName,
        password: this.userSignInPassword
      })
        .then(res => {
          setItem("userInfo", res.user, true); // 无token时，本地头像展示
          setItem("my_token", res.token, true);
          this.$store.commit("SET_USER_INFO", res.user); // store 存储userinfo
          this.$router.push(this.$route.query.redirect || "home");
          /* global GLOBAL */
          GLOBAL.vbus.$emit("user_online", res.user);
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    goSignUp() {
      this.isShowLogin = false;
    },
    goSignIn() {
      this.isShowLogin = true;
    },
    getAvatorUrl(e) {
      const file = e.target.files[0];
      const filePath = this.$refs.fileInput.value;
      if (file) {
        const typeIdx = filePath.lastIndexOf(".");
        const fileType =
          typeIdx > -1
            ? filePath.substring(typeIdx + 1, filePath.length).toLowerCase()
            : "";
        //判断上传的附件是否为图片
        if (["jpg", "jpeg", "bmp", "png", "gif"].indexOf(fileType) < 0) {
          this.$message({
            message: "请选择图片格式！",
            type: "error"
          });
          this.$refs.fileInput.value = "";
          return;
        }
        lrz(file, { width: 40 })
          .then(result => {
            // this.avatorFile = result.formData;
            this.avatorFile = result.file; //压缩后的file对象
            this.userAvatorUrl = result.base64;
          })
          .always(() => {
            this.$refs.fileInput.value = "";
          });
      }
      this.$refs.fileInput.value = "";
    },
    async signUp() {
      if (!this.userSignUpName || !this.userSignUpPassword) {
        return;
      }
      const formData = new FormData();
      formData.append("file", this.avatorFile, "avator.jpeg");
      const avatorObj = await uploadFile(formData);
      signUpApi({
        name: this.userSignUpName,
        password: this.userSignUpPassword,
        avator: avatorObj.urls
      })
        .then(() => {
          this.userSignInName = this.userSignUpName;
          this.goSignIn();
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$images: "../../assets/images/";
.page-container {
  // height: 100%;
  // background: url($images+"login_bg.png") no-repeat;
  // background-size: cover;
  // filter: blur(5px);
  .login-container,
  .sign-up-container {
    max-width: 500px;
    margin: 200px auto 0px;
    padding: 20px 30px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .from-item {
      padding: 15px 0px;
      button {
        padding: 2px 12px;
        margin-right: 12px;
      }
      span {
        margin-right: 12px;
      }
    }
  }

  .avator-image {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 50%;
    align-self: center;
    margin-top: -70px;
    margin-bottom: 20px;
  }

  .oauth-con {
    margin-top: 30px;
    .oauth-tip {
      font-size: 14px;
      margin-bottom: 12px;
      text-align: center;
    }
    .oauth-content {
      display: flex;
      .oauth-icon {
        width: 50px;
        height: 50px;
        border-radius: 30px;
        display: block;
      }
      .oauth-label {
        color: #959595;
      }
    }
  }
}
</style>


