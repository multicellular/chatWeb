<template>
  <div class="page-container" v-loading="isLoading">
    <div class="main-container">
      <div v-if="isShowLogin" class="login-container">
        <div class="from-item">
          <span>Account</span>
          <input placeholder="enter your account" v-model="userLoginAccount">
        </div>
        <div class="from-item from-btn">
          <button @click="login" class="from-btn">Login</button>
          <button @click="signUp" class="from-btn">Sign Up</button>
        </div>
      </div>
      <div v-else class="sign-up-container">
        <div class="from-item">
          <span>Account</span>
          <input placeholder="enter your account" v-model="userSignUpAccount">
        </div>
        <div class="from-item">
          <span>Nick Name</span>
          <input placeholder="enter your nick name" v-model="userSignUpName">
        </div>
        <div class="from-item">
          <span>avatar</span>
          <span
            class="avatar-image"
            @click="selectUrl = url"
            v-for="url in mockUrls"
            :key="url"
            :style="{'background-image': 'url('+url+')'}"
            :class="{selectd:selectUrl === url}"
          ></span>
        </div>
        <div class="from-item">
          <button class="from-btn" @click="createAccount">Create Account</button>
          <button class="from-btn" @click="goLogin">Go Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem, setItem } from "@/utils/storage";
import { loginApi, createApi, createRoomApi } from "@/api/login";
export default {
  data() {
    return {
      isShowLogin: true,
      userLoginAccount: "",
      userSignUpAccount: "",
      userSignUpName: "",
      isLoading: false,
      mockUrls: [
        "http://www.uuwtq.com/file/image/2014/0414/13974774460233.jpg",
        "http://www.uuwtq.com/file/image/2014/0418/13977935560153.gif",
        "http://www.uuwtq.com/file/image/2014/0426/13985165616043.jpg",
        "http://www.uuwtq.com/file/image/2014/0426/13985165920065.jpg",
        "http://www.uuwtq.com/file/image/tx/1w3239936350u366979017t27.jpg"
      ],
      selectUrl: ""
    };
  },
  mounted() {
    this.userLoginAccount = getItem("userAccount", true);
  },
  methods: {
    login() {
      this.isLoading = true;
      loginApi(this.userLoginAccount)
        .then(res => {
          setItem("userAccount", this.userLoginAccount, true);
          this.$store.commit("SET_USER_INFO", res);
          this.$router.push(this.$route.query.redirect || "home");
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    signUp() {
      this.isShowLogin = false;
    },
    goLogin() {
      this.isShowLogin = true;
    },
    createAccount() {
      this.isLoading = true;
      createApi({
        userId: this.userSignUpAccount,
        nickName: this.userSignUpName,
        avatarURL:
          this.selectUrl ||
          // "http://www.uuwtq.com/file/image/2014/0823/14087671057534.jpg",
          "http://www.uuwtq.com/file/image/2014/0414/13974774460233.jpg",
          // customData: { isRobot: true }
      })
        .then(res => {
          this.isLoading = false;
          setItem("userAccount", this.userLoginAccount, true);
          if (res.id) {
            createRoomApi({
              userId: "ROBOT",
              roomName: "机器人房间",
              userIds: [res.id],
              isPrivate: true,
              customData: { isRobotRoom: true }
            });
          }
          this.goLogin();
        })
        .catch(err => {
          console.log(err);
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
    padding: 70px 20px;
    background-color: #fff;
    display: flex;
    .from-item {
      padding: 15px 0px;
      button {
        padding: 2px 12px;
        margin-right: 12px;
      }
      span {
        margin-right: 12px;
      }
      .avatar-image {
        width: 30px;
        height: 30px;
        background-size: cover;
        position: relative;
        display: inline-block;
        border-radius: 50%;
        &.selectd {
          width: 50px;
          height: 50px;
        }
        // &.selectd::before {
        //   content: "☑";
        //   right: -3px;
        //   top: -7px;
        //   color: #00ff26;
        //   position: absolute;
        // }
      }
    }
  }
  .login-container {
    justify-content: space-around;
  }
  .sign-up-container {
    flex-direction: column;
  }
}
</style>


