<template>
  <b-row>
    <b-col>
      <b-row class="mt-1" 
      v-for="row in Math.ceil(denom.amount/20)" 
      :key="row+'.stk-'+denom.color"
      align-h="end">
      <span class="slush">{{ row===1 && denom.amount%denom.max!==0 ? denom.amount%denom.max+'x' : '' }}</span>
      <chip 
        v-for="dropCut in totalDropCut(row, denom.max, denom.amount)" 
        :key="denom.max+'dropCut'+dropCut"
        @click.native="take(row, dropCut, totalDropCut(row, denom.max, denom.amount), denom)"
        :denom="denom"/>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import Chip from '~/components/Chip.vue'
export default {
  props: ["denom", "pinch"],

  methods: {
    take(row, dropCut, total, denom){
      if(this.pinch === false){
        return;
      }
      let answer = this.answer;
      let take = denom.max;
      if(row === 1 && dropCut === total && denom.amount%denom.max!==0){
        take = denom.amount%denom.max;        
      }

      if(this.denoms[denom.index].amount < take){
        return
      }

      this.denoms[denom.index].amount -= take;
      answer -= take*denom.value;
      this.$store.commit("game/setAnswer", answer);
    },
    totalDropCut(row, max, amount){
      let remainingChips = 20;
      if(row===1 && amount%20!==0){
        remainingChips = amount%20;
      }
      return Math.ceil(remainingChips/max)
    },
  },
  computed: {
    denoms() {
      return this.$store.state.game.denoms;
    },
    answer() {
      return this.$store.state.game.answer;
    }
  },
  components: {
    Chip
  },
}
</script>
<style scoped>
  .slush {
    font-size: .9rem;
    font-weight: 600;
  }
</style>


