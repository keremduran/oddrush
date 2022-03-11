<template>
  <b-container class="game" fluid>
    <b-modal
      lazy
      title="Hi"
      ref="gameModalRef"
      header-bg-variant="info"
      header-text-variant="light"
      class="text-center game-modal"
      variant="dark"
      size="sm"
      hide-footer
      no-close-on-backdrop
      centered
    >
      <div class="d-block text-center">
        <h3 class="game-modal-title">{{ message.title }}</h3>
        <h3>{{ message.gesture }}</h3>
        <h4>
          <b-badge variant="dark">Your score: {{ score }} </b-badge>
        </h4>
      </div>
      <b-btn class="mt-3" variant="danger" @click="hideModal">Close</b-btn>
    </b-modal>
    <b-row class="god-area my-2" align-h="center">
      <b-alert v-model="info" variant="info" dismissible
        >Hello, please press the <b>Blue Clubs Button</b> for odds and info at
        the bottom.
      </b-alert>
    </b-row>
    <b-row class="player-area my-2">
      <b-col>
        <b-row class="wager-area" align-h="center" align-v="end">
          <div class="py-1">
            <chip-row
              v-for="denom in wagerDenoms"
              :key="denom.index + '-chip-row-' + denoms[denom.index].color"
              :denom="denom"
              :pinch="false"
            />
          </div>
        </b-row>
        <b-row class="odd-display-area" align-w="center" align-h="center">
          <b-alert variant="light" show>{{ odd.text }}</b-alert>
        </b-row>
        <!-- <b-row class="cheat-area" align-h="center">{{ result }}</b-row> -->
      </b-col>
    </b-row>
    <b-row>
      <b-col md="5">
        <b-row class="dropcut-selector-area mt-2">
          <b-col class="col-xs-12" v-if="dropCutActive">
            <b-row class="dropcut-buttons" align-h="start">
              <b-btn
                v-for="n in denoms[selectedDenom].max"
                :style="{
                  backgroundColor: denoms[selectedDenom].color,
                  color: denoms[selectedDenom].textColor
                }"
                @click="dropCut(n)"
                class="dropcut-btn"
                :key="n + '+' + denoms[selectedDenom].color"
                >{{ n }}</b-btn
              >
            </b-row>
            <b-row class="pay mt-2">
              <b-btn :variant="resultIndicator()" @click="checkAnswer()">
                Pay!
              </b-btn>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="7">
        <b-row class="working-area" align-v="end">
          <b-col class="shows" lg="8" sm="11" xs="12" align-h="center">
            <chip-row
              v-for="denom in activeDenoms"
              :key="
                denom.index + '-dealer-chip-row-' + denoms[denom.index].color
              "
              :denom="denom"
              :pinch="true"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row align-v="end" align-h="start" class="tray my-2">
      <b-row v-if="gameOn" class="left-tray" align-h="center">
        <chip
          v-for="(denom, index) in denoms"
          :key="index + '-' + denom.color"
          :denom="denom"
          class="mr-1"
          @click.native="selectDenom(denom.index)"
        />
      </b-row>
    </b-row>
    <b-row class="mt-4" align-h="center" align-v="end">
      <b-btn
        v-if="!gameOn"
        class="go-button"
        size="md"
        variant="success"
        @click="$store.commit('game/startGame')"
        >GO</b-btn
      >
      <b-btn
        v-else
        class="go-button"
        size="md"
        variant="outline-danger"
        @click="$store.commit('game/endGame')"
        >End Game</b-btn
      >
    </b-row>
  </b-container>
</template>

<script>
import Chip from "~/components/Chip.vue";
import ChipRow from "~/components/ChipRow.vue";
export default {
  watch: {
    gameOn(newState, oldState) {
      if (!newState) {
        this.end(this.noLife || this.timeOut);
      } else {
        this.start();
      }
    }
  },
  data() {
    return {
      info: true,
      wager: null,
      wagerDenoms: [],
      result: null,
      odd: {
        text: null
      },
      correct: null,
      selectedDenom: null,
      dropCutActive: false,
      timer: null
    };
  },
  methods: {
    wagerToDenoms() {
      let wagerDenoms = [];
      let wager = this.wager;
      let amount = 0;
      //clears the 2.5
      if (wager % 1 === 0.5 && wager > 2.5) {
        wagerDenoms.push({
          index: this.denoms[1].index,
          amount: 1,
          value: this.denoms[1].value,
          color: this.denoms[1].color,
          textColor: this.denoms[1].textColor,
          max: this.denoms[1].max
        });
        wager -= this.denoms[1].value;
      }

      for (let i = this.denoms.length - 1; i >= 0; i--) {
        if (this.denoms[i].value > wager || i === 1) {
          continue;
        } else if (i > 2 && Math.floor(Math.random() * 5) < 1) {
          //Random Checkchange
          continue;
        } else {
          amount = Math.floor(wager / this.denoms[i].value);
          wager -= amount * this.denoms[i].value;
          wagerDenoms.push({
            index: this.denoms[i].index,
            amount: amount,
            value: this.denoms[i].value,
            color: this.denoms[i].color,
            textColor: this.denoms[i].textColor,
            max: this.denoms[i].max
          });
        }
      }
      wagerDenoms.sort(this.compareDenoms);
      this.wagerDenoms = wagerDenoms;
    },
    compareDenoms(denom1, denom2) {
      if (denom1.value < denom2.value) {
        return -1;
      } else if (denom1.value > denom2.value) {
        return 1;
      } else {
        return 0;
      }
    },
    startTimer() {
      this.timer = setInterval(this.countDown, 1000);
    },
    countDown() {
      this.$store.commit("game/countDown");
      if (this.timeOut) {
        clearInterval(this.timer);
        this.$store.commit("game/addAnswer", {
          wager: this.wager,
          correct: null,
          value: this.answer,
          odd: this.odd,
          result: this.result
        });
        this.$store.commit("game/endGame");
      }
    },
    start() {
      this.setSelectedOdds();
      this.$store.commit("game/clearAnswers");
      this.$store.commit("game/resetScore");
      this.$store.commit("game/resetTimer");
      this.$store.commit("game/setAnswer", 0);
      this.wager = 0;
      this.odd = {
        text: null
      };
      this.$store.commit("game/startGame");
      this.newPayout();
      this.startTimer();
    },
    end(modal) {
      if (modal) {
        this.showModal();
      }
      this.dropCutActive = false;
      this.clearWorkingArea();
      this.wagerDenoms = [];
      this.odd = {
        text: null
      };
      clearInterval(this.timer);
    },
    selectDenom(index) {
      this.dropCutActive = true;
      this.selectedDenom = index;
    },
    dropCut(add) {
      let answer = this.answer;
      this.denoms[this.selectedDenom].amount += add;
      answer += add * this.denoms[this.selectedDenom].value;
      this.$store.commit("game/setAnswer", answer);
    },
    toggleOdd(index) {
      this.allOdds[index].active = !this.allOdds[index].active;
    },
    setOdd() {
      if (this.selectedOdds.length > 1) {
        let index = Math.floor(Math.random() * this.selectedOdds.length);
        this.odd = this.selectedOdds[index];
      } else if (this.selectedOdds.length === 0) {
        this.odd = this.allOdds[0];
      } else {
        this.odd = this.selectedOdds[0];
      }
    },
    newPayout() {
      this.$store.commit("game/setAnswer", 0);
      this.setOdd();
      this.clearWorkingArea();
      this.setWager();
      this.wagerToDenoms();
      this.setResult();
    },
    setWager() {
      let tableMin = this.tableMin || 25;
      let increment = this.increment;
      if (this.odd.increment) {
        increment = this.odd.increment;
      }
      let upper = tableMin + (this.score + 1) * 50;
      let number = tableMin + Math.floor(Math.random() * upper);
      let half = 0.5;

      if (number < tableMin / 4) {
        number = tableMin;
      } else if (number < tableMin) {
        number += tableMin;
      }
      number += half;
      number = number - (number % increment);
      this.wager = number;
    },
    setResult() {
      const result = this.wager * this.odd.value;
      if (result % 1 !== 0.5 || 0) {
        this.result = this.round(result);
      } else {
        this.result = result;
      }
    },
    round(number) {
      //round up on blackjack, closest on baccarat
      if (
        this.odd.value === 0.05 ||
        (this.odd.value === 0.95 && number % 1 > 0)
      ) {
        if (number % 1 <= 0.25) {
          return Math.floor(number);
        } else if (number % 1 >= 0.75) {
          return Math.ceil(number);
        } else {
          return Math.round(number * 2) / 2;
        }
      } else if (this.odd.value === 1.5) {
        if (number % 1 > 0.5) {
          return Math.ceil(number);
        } else if (number % 1 < 0.5) {
          return Math.round(number * 2) / 2;
        }
      }
      return number;
    },
    clearWorkingArea() {
      this.denoms.forEach(denom => (denom.amount = 0));
    },
    checkAnswer() {
      let correct = this.answer === this.result;
      this.correct = correct;
      if (correct) {
        this.$store.commit("game/scoreUp");
      } else {
        this.$store.commit("game/lifeDown");
      }

      this.$store.commit("game/addAnswer", {
        wager: this.wager,
        correct: correct,
        value: this.answer,
        odd: this.odd,
        result: this.result
      });

      if (!this.gameOn) {
        this.$store.commit("game/endGame");
        return;
      }

      this.newPayout();
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
    resultIndicator() {
      if (this.correct) {
        return "outline-success";
      } else if (this.correct === null) {
        return "outline-info";
      } else {
        return "outline-danger";
      }
    },
    showModal() {
      this.$refs.gameModalRef.show();
    },
    hideModal() {
      this.$refs.gameModalRef.hide();
    }
  },
  computed: {
    tableMin() {
      return this.$store.state.game.tableMin;
    },
    answer() {
      return this.$store.state.game.answer;
    },
    message() {
      return this.$store.state.game.message;
    },
    answers() {
      return this.$store.state.game.answers;
    },
    noLife() {
      return this.$store.state.game.noLife;
    },
    lives() {
      return this.$store.state.game.lives;
    },
    allOdds() {
      return this.$store.state.game.odds;
    },
    score() {
      return this.$store.state.game.score;
    },
    denoms() {
      return this.$store.state.game.denoms;
    },
    activeDenoms() {
      return this.denoms.filter(denom => denom.amount > 0);
    },
    gameOn() {
      return this.$store.state.game.on;
    },
    message() {
      return this.$store.state.game.message;
    },
    timeOut() {
      return this.$store.state.game.timeOut;
    },
    selectedOdds() {
      return this.$store.state.game.reducedSelectedOdds;
    },
    increment() {
      return this.$store.state.game.increment;
    },
    remainingSeconds() {
      return (
        this.$store.state.game.maxSeconds -
        this.$store.state.game.remainingSeconds
      );
    },
    averageSeconds() {
      let max = this.$store.state.game.maxSeconds;
      let remaining = this.$store.state.game.remainingSeconds;
      let used = max - remaining;
      if (used === 0) {
        used = 1;
      }
      return Math.floor(used / this.score);
    }
  },
  components: {
    Chip,
    ChipRow
  }
};
</script>

<style scpoed>
.wager-area {
  font-weight: 500;
  min-height: 6rem;
}
.working-area {
  min-height: 6rem;
}
.dropcut-selector-area {
  min-height: 7rem;
}
.odd-display-area {
  font-weight: 350;
  font-size: 1.5rem;
}
.odd-button {
  width: 4.1rem;
  font-size: 0.8rem;
  font-weight: 500;
}
.game-modal-title {
  font-weight: 700;
}
.left-tray {
  border-top: 0.1rem solid black;
  padding: 0.5rem;
}
.dropcut-btn {
  margin-right: 0.4rem;
}
.go-button {
  font-weight: 720;
}

/* @media only screen and (max-width: 576px) {
    .dropcut-btn {
        font-size: 12px !important;
    }
  } */
</style>
