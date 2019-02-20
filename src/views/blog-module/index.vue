<template>
  <div id="blog-module" class="module-container">
    <nav class="nav-container">
      <ul class="nav-ul">
        <li @click="goRoute(navs['home'].path)">{{navs['home'].name}}</li>
        <li @click="goRoute(navs['chat'].path)">{{navs['chat'].name}}</li>
        <!-- <li @click="goRoute(navs['game'].path)">{{navs['game'].name}}</li> -->
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { navMixin } from "@/utils/mixins";
export default {
  name: "blog-module",
  mixins: [navMixin]
};
</script>

<style lang="scss" scoped>
</style>