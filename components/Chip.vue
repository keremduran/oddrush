<template>

  <b-btn 
    class="chip circle" 
    :style="{backgroundColor: denom.color, color: denom.textColor}"
    >{{denom.value}}</b-btn>

</template>

<script>
export default {
  props: ["denom"],
};
</script>


<style scoped>
.circle {
  border-radius: 50%;
}

.chip {
  font-size: 13px;
  font-weight: 600;
  height: 3em;
  width: 3em;
  padding: 0;
}

.chip-container {
  display: inline-block;
}
</style>

