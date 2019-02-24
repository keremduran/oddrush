<template>
  <div>
    <div class="curtain" v-if="curtain">
      <logo />
      <h1 class="title">
        oddrush
      </h1>
      <h2 class="subtitle">
        A bedazzling odd calculation game for the casino folk
      </h2>
      <div class="links">
        <a
          @click="toggleCurtain()"
          class="button--grey"
        >Play</a>
      </div>
    </div>
    <b-container class="game-stuff" fluid v-else>
      <b-row>
        <b-col cols="9" md="7" class="game-col"><game /></b-col>
        <b-col cols="3" md="5" class="scoreboard-col"><score-board /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Game from '~/components/Game.vue'
import ScoreBoard from '~/components/ScoreBoard.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    Logo,
    Game,
    ScoreBoard
  },
  methods: {
    toggleCurtain(){
      this.$store.commit('toggleCurtain');
    },
  },
  computed: {
    curtain() {
      return this.$store.state.curtain
    },
  },
  mounted() {
    //this.init();
  }
}
</script>

<style scoped>
.game-col {
/* background-color: #3aaf5548; */
  min-height: 100vh;
}
.scoreboard-col {
  /* background-color: #4da4d68f; */
  min-height: 100vh;
}
.curtain {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.game-stuff {
  min-height: 100vh;
}
</style>
