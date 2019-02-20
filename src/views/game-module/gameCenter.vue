<template>
  <div class="page-container">
    <div class="main-container">
      <div class="game-list">
        <div class="game" v-for="game in games" :key="game.id" @click="playGame(game)">
          <span>{{game.name}}</span>
          <img :src="game.poster">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      games: [
        { id: "1", name: "game001", path: "game001" },
        { id: "2", name: "game002", path: "game002" }
      ]
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    
  },
  methods: {
    playGame({ path }) {
      this.$router.push({
        // path: "chat",
        name: path
        // params: {
        //   room
        // }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
}
</style>


