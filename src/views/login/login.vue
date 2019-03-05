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
import { findApplyApi, allowJoinFriendApi } from "@/api/chat";
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
      localUser: {}
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
          if (res.code === 0) {
            setItem("userInfo", res.user, true); // 无token时，本地头像展示
            setItem("my_token", res.token, true);
            this.$store.commit("SET_USER_INFO", res.user); // store 存储userinfo
            this.$router.push(this.$route.query.redirect || "home");
            this.getNotifys(res.user.id);
          } else {
            this.$message(res.msg);
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
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
        // 限制上传图片大小
        const fileSize = file.size / 1024;
        if (fileSize > 1024) {
          this.$message({
            message: "图片大小不能超过1MB！",
            type: "error"
          });
          this.$refs.fileInput.value = "";
          return;
        }

        // this.file = file;
        const reader = new FileReader();
        const that = this;
        reader.readAsDataURL(file);
        reader.onload = function() {
          that.$refs.fileInput.value = "";
          that.userAvatorUrl = reader.result;
        };
      }
      this.$refs.fileInput.value = "";
    },
    signUp() {
      if (!this.userSignUpName || !this.userSignUpPassword) {
        return;
      }
      this.isLoading = true;
      signUpApi({
        name: this.userSignUpName,
        password: this.userSignUpPassword,
        avator: this.userAvatorUrl
      })
        .then(res => {
          if (res.code === 0) {
            this.userSignInName = this.userSignUpName;
            this.goSignIn();
          } else {
            this.$message(res.msg);
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    getNotifys(invitees_uid) {
      findApplyApi({ invitees_uid }).then(({ applys }) => {
        const len = applys && applys.length;
        for (let i = 0; i < len; i++) {
          const apply = applys[i];
          const {
            verify_message: uremark,
            apply_uid,
            apply_flist_id,
            invitees_uid,
            invitees_flist_id,
            id: applyId
          } = apply;
          let notify = this.$notify({
            title: "好友申请",
            message: "验证消息: " + apply.verify_message,
            duration: 0,
            onClick: () => {
              allowJoinFriendApi({
                uremark,
                apply_uid,
                apply_flist_id,
                invitees_uid,
                invitees_flist_id,
                applyId
              }).then(code => {
                if (code === 0) {
                  notify.close();
                }
              });
            }
          });
        }
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
}
</style>


