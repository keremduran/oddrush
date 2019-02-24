<template>
  <b-container class="scoreboard">
    <b-row class="game-controls dropright" align-h="around">
      <b-dropdown class="mt-1" menu-class="odd-menu" no-caret variant="primary" size="sm" right>
        <template slot="button-content"><span class="mx-2 suit" style="font-size: 1.2rem">&clubs;</span></template>
        <b-row class="pb-2" align-h="center">
          <b>Odds</b>
        </b-row>
        <b-row class="odd-buttons px-3" align-h="center">
          <b-btn
            :variant="odd.active?'success':'outline-secondary'"
            size="sm"
            style="min-width: 3rem"
            v-for="(odd, index) in allOdds"
            @click="toggleOdd(index), setSelectedOdds()"
            :key="'toggle'+index"
            class="mx-1 mb-1 odd-button"><b>{{odd.text}}</b></b-btn>
        </b-row>
        <b-dropdown-divider/>
        <b-row align-h="center">
          <b>Increments</b>
          <b-form-group>
            <b-form-radio-group
              id="btnradios1"
              buttons
              v-model="selected"
              button-variant="warning"
              :options="options"
              @input="setIncrement(selected)"
            />
          </b-form-group>
        </b-row>
      </b-dropdown>
    </b-row>
    <b-row> 
      <b-progress 
        :variant="remainingSeconds<25 ? 'danger':'warning'" 
        :value="remainingSeconds" 
        :max="maxSeconds"
        striped
        show-value
        class="w-100 my-2 counter"></b-progress>
    </b-row>
    <b-row align-h="center">
      <h5><b-badge class="mb-2" variant="danger">
        <span v-for="index in lives" class="mx-1" style="font-size: 1.4rem;" :key="index+'remaining-lives'" >&hearts;</span>
      </b-badge></h5>
    </b-row>
    <b-row align-v="center" align-h="center">
      <h3><b-badge variant="dark">{{ score }}</b-badge></h3>
    </b-row>
    <b-row v-if="answers.length>0" align-h="center">
      <b-badge
        v-for="(answer, index) in answers"
        :key="index"
        v-b-popover.hover="answer.value+''" :title="answer.odd.text"
        :variant="variant(answer.correct)"
        show
        class="mx-1 my-1 text-align-center"
        style="min-width: 4rem"
      >{{ answer.wager }}<br>{{ answer.result }}
      </b-badge>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data(){
    return {
      selected: '5',
    }
  },
  methods: {
    timeOut(){
      this.$store.commit('game/timeOut')
    },
    variant(correct){
      if(correct === null){
        return 'secondary'
      } else if(correct){
        return 'success'
      } else if (!correct){
        return 'danger'
      }
    },    
    toggleOdd(index) {
      this.allOdds[index].active = !this.allOdds[index].active;
    },
    setSelectedOdds() {
      let selectedOdds = [];
      this.allOdds.forEach(odd => {
        if (odd.active) {
          selectedOdds.push(odd);
        }
      });
      this.$store.commit("game/setOdds", selectedOdds);
    },
    setIncrement(increment){
      this.$store.commit("game/setIncrement", increment);
    }
  },
  computed: {
    answers() {
      return this.$store.state.game.answers;
    },
    lives() {
      return this.$store.state.game.lives;
    },
    score() {
      return this.$store.state.game.score;
    },
    remainingSeconds() {
      return this.$store.state.game.remainingSeconds;
    },
    maxSeconds() {
      return this.$store.state.game.maxSeconds;
    },
    allOdds() {
      return this.$store.state.game.odds;
    },
    selectedOdds() {
      return this.$store.state.game.reducedSelectedOdds;
    },
    options() {
      return this.$store.state.game.increments;
    },
  }
};
</script>

<style scoped>
  .scoreboard {
    min-height: 75vh;
    /* background-color: #007bff42 !important; */
  }
  .suit {
    font-size: 1.5rem !important;
  }

  .counter {
    font-size: 1rem;
    font-weight: 700;
  }
</style>





