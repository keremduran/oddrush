<template>
  <div cols="5" class="dropCut">
    <svg :width="width" :height="height" :viewBox="'0 '+(maxHeight-height)+' '+width+' '+height">
      <path :fill="color" :d="path(index)" v-for="index in dropCut+1" :key="index+12" ></path>
    </svg>
  </div>
</template>
<script>
export default {
  props: ["dropCut", "color"],
  data() {
    return {
      firstIncrement: 12,
      increment: 5,
      initY: null,
      lastY: 35,
      maxHeight: 40,
      width: 34
    }
  },
  methods: {
    path(i){
      let y;
      let d;
      let initY = this.lastY - this.firstIncrement - (this.dropCut-1)*this.increment;
      if(i === 1){
        d = "M17 "+initY+"c-8.837 0-16 2.239-16 5v1 c0 2.761 7.163 5 16 5s16-2.239 16-5v-1c0-2.761-7.163-5-16-5z"
        return d;
      } else if (i === 2){
        y = initY + this.firstIncrement;
      } else {
        y = initY + this.firstIncrement + (i-2)*this.increment;
      }
      d = "M17 "+y+"c-8.837 0-16-2.239-16-5v4 c0 2.761 7.163 5 16 5s16-2.239 16-5v-4c0 2.761-7.163 5-16 5z"
      return d;
    }
  },
  computed: {
    height(){
      return 11 + this.dropCut*6;
    }
  }
}
</script>
<style scoped>
  .chipLine {
    width: 2rem;
    height: .5rem;
    border-radius: 20%;
    border: .1rem solid black;
  }
  /* .dropCut {
    display: inline-block;
    margin: .1rem .05rem 0 0;
  } */
</style>

