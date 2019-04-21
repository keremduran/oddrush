<template>
  <b-row>
    <b-col>
      <b-row class="mt-1 first-row"
      align-h="end"
      align-v="end">
        <dropCut
        v-for="index in howManyDropCuts" 
        :key="index+'ofMax'+denom.max"
        :color="denom.color"
        :class="pinch ? 'pinch':''"
        @click.native="take(index)"
        :dropCut="dropCut(index)"/>
      </b-row>  
      <b-row class="mt-1"
      align-h="end"
      align-v="end"
      v-for="stack in Math.ceil(this.denom.amount/20)-1"
      :key="123+stack">
        <dropCut
        v-for="index in 20/denom.max" 
        :key="index+'ofMax'+denom.max"
        :color="denom.color"
        @click.native="take(5)"
        :dropCut="denom.max"/>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import Chip from '~/components/Chip.vue'
import DropCut from '~/components/DropCut.vue'
export default {
  props: ["denom", "pinch"],
  data(){
    return {
      amount: null,
    }
  },
  methods: {
    take(dropCut){
      if(!this.pinch){
        return;
      }
      let answer = this.answer;
      let take = this.denom.max;
      if(dropCut === 1){
        take = 1;        
      }

      if(this.denoms[this.denom.index].amount < take){
        return
      }

      this.denoms[this.denom.index].amount -= take;
      answer -= take*this.denom.value;
      this.$store.commit("game/setAnswer", answer);
    },
    dropCut(index){
      let dropCut;
      if(this.denom.amount <= 0){
        return;
      } else if((this.denom.amount%this.denom.max)!==0 && index===1){
        dropCut = this.denom.amount%this.denom.max;
      } else {
        dropCut = this.denom.max;
      }
      return dropCut;
    }
  },
  computed: {
    denoms() {
      return this.$store.state.game.denoms;
    },
    answer() {
      return this.$store.state.game.answer;
    },
    howManyDropCuts(){
      let amount;
      if(this.denom.amount%20===0 && this.denom.amount !==0){
        amount = 20;
      } else {
        amount = this.denom.amount%20;
      }
      return Math.ceil((amount)/this.denom.max);
    },
  },
  components: {
    Chip,
    DropCut
  },
}
</script>
<style scoped>
  .pinch:hover {
    cursor: pointer;
  }

</style>


