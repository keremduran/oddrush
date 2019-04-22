<template>
  <b-container class="scoreboard">
    <b-modal lazy
      title=":)"
      ref="infoModalRef" 
      header-bg-variant="light"
      header-text-variant="dark"
      variant="info"
      size="xl"
      hide-footer>
      <div class="d-block info">
        <b>Welcome!</b> This is a game to practice payouts with many odds and progressive random bets.
        <br><br>First, set your odds and other game settings (which you can change in the middle of the game). You may select multiple odds, and for each new payout, a random odd will be set from the ones you've selected.
        <br><br>Then, click on <b>GO</b>, and you'll see the broken-down wager and the odd at the top, and tray at the bottom. Start paying by selecting a color from the tray, and the dropcut and pay buttons will pop up on the middle left. After you press the dropcut buttons, your chips will appear automatically broken down on the middle right. 
        <br><br>If you want to erase chips, click on the left-most block to take just 1 chip and put it in the abyss (Nice with 95% odd for Baccarat). Clicking the other ones will erase the entire block.
        <br>(If it's unclear how many chips are there, you can just count the white lines.)
        <br><br>On the right, there is the scoreboard where previous payouts will be listed. Hover or tap each to see what was your answer and the odd for that payout.
      </div>
      <b-btn class="mt-3" variant="danger" @click="hideInfoModal">Close</b-btn>
    </b-modal>
    <b-row class="game-controls dropright" align-h="around">
      <b-dropdown class="mt-1" menu-class="odd-menu" no-caret variant="primary" right>
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
        <b-dropdown-divider/>
        <b-row align-h="center">
          <b>Table Min</b>
          <b-form-group >
            <b-form-radio-group v-model="tableMin" buttons button-variant="light" size="sm">
              <b-form-radio name="some-radios" value="25">25</b-form-radio>
              <b-form-radio name="some-radios" value="500">500</b-form-radio>
              <b-form-radio name="some-radios" value="2000">2k</b-form-radio>
              <b-form-radio name="some-radios" value="5000">5k</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-row>
        <b-dropdown-divider/>
        <b-row align-h="center">
          <b-btn class="info-button" size="md" @click="showInfoModal" variant="outline-success">i</b-btn>
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
      <h5><b-badge class="mb-2 hearts" variant="danger">
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
        class="mx-1 my-1 text-align-center answer-badge"
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
      tableMin: '25'
    }
  },
  watch: {
    tableMin(newValue){
      this.setTableMin(newValue);
    }
  },
  methods: {
    end(){
      this.$store.commit('game/endGame')
    },
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
    setTableMin(tableMin){
      this.$store.commit("game/setTableMin", parseInt(tableMin));
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
    },
    showInfoModal () {
      this.$refs.infoModalRef.show();
    },
    hideInfoModal () {
      this.$refs.infoModalRef.hide()
    },
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
  .badge:hover {
    cursor: default;
  }
  .info-button {
    font-weight: 750;
  }
  /* .b-dropdown {
    min-width: 15rem !important;
  } */
</style>





