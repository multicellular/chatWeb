<template>
  <div id="chat-module" class="module-container">
    <nav class="nav-container">
      <ul class="nav-ul">
        <li @click="goRoute(navs['home'].path)">{{navs['home'].name}}</li>
        <li @click="goRoute(navs['blog'].path)">{{navs['blog'].name}}</li>
        <!-- <li @click="goRoute(navs['game'].path)">{{navs['game'].name}}</li> -->
      </ul>
    </nav>
    <router-view v-if="!isLoading"/>
    <div v-loading="isLoading"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navMixin } from "@/utils/mixins";
export default {
  name: "chat-module",
  mixins: [navMixin],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["user"]),
    isLoading() {
      return !this.user.hasInfo;
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>


