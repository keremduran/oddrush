<template>
  <div class="VueToNuxtLogo">
    <div class="Circle Circle--one" />
    <div class="Circle Circle--two" />
    <div class="Circle Circle--three" />
    <div class="Circle Circle--four" />
    <div class="Circle Circle--five" />
    <div class="Circle Circle--six" />
  </div>
</template>

<style>
.VueToNuxtLogo {
  display: inline-block;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 245px;
}

.Circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-radius: 50%;
}
.Circle--six {
  border: 45px solid rgb(250, 31, 139);
  animation: gorightmore 0.4s linear forwards 3s;  
}

.Circle--five {
  border: 45px solid rgb(240, 31, 140);
  animation: goright 0.4s linear forwards 3s;  
}

.Circle--four { 
  border: 45px solid rgb(231, 31, 141);
}

.Circle--three {
  top: 35px;
  border: 45px solid rgb(0, 0, 0);
}

.Circle--two {
  top: 70px;
  border: 45px solid rgb(64, 184, 130);
}

.Circle--one {
  top: 105px;
  animation: godown 0.4s linear forwards 2s;
  border: 45px solid #d12b2b;
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes godown {
  100% {
    top: 180px;
  }
}

@keyframes goright {
  100% {
    left: 75px;
  }
}

@keyframes gorightmore {
  100% {
    left: 145px;
  }
}
</style>
