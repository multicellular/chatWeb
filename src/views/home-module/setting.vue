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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { modifyBioApi } from "@/api/login";
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
}
</style>


