<template>
  <div id="blog-module" class="module-container">
    <!-- <nav class="nav-container">
        <ul class="nav-ul">
          <li @click="goRoute(navs['home'].path)">{{navs['home'].name}}</li>
          <li @click="goRoute(navs['chat'].path)">{{navs['chat'].name}}</li>
        </ul>
    </nav>-->
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
#blog-module {
    height: 100vh;
    overflow: hidden;
  .blog-nav {
    // position: absolute;
    // top: 40px;
    // background-color: #fafbfc;
    // margin: 0px 60px;
  }
}
</style>