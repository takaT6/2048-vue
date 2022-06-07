<template>
  <div 
    class="canvas" 
    :style="{
      '--base-fontsize': `${state.boardWidth / (state.size * 2)}px`,
      '--grid-size': state.size,}">
    <div class="grid" ref="gameBoardElement" >
      <div class="box" v-for="num in state.size*state.size" :key="num"></div>
      <div 
        class="inbox" 
        v-for="inbox in state.currentGame.inboxes"
        :key="inbox"
        :style="{ transform: `translate(${inbox.x * 100}%,${inbox.y * 100}%)` }"
        :class="[
            `inbox-${inbox.val > 65536 ? 'super' : inbox.val}`,
            { 'inbox-merged': inbox.m },
          ]"
      >
        <transition name="inbox" appear>
          <div :innerText="inbox.val"></div>
        </transition>
      </div>
    </div>
  </div>
  <button @click="ff()"></button>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { state } from '../modules/const';
import { startGame, keyDownEvent, newGame } from '../modules/gm_logic';
const log = (mssg: string)=> console.log(mssg);

const gameBoardElement = ref(null);

const setBoardWidth = () => {
  state.boardWidth = gameBoardElement.value.clientWidth;
};

function ff(){
  newGame();
}
onMounted( () => {
  document.addEventListener('keydown', keyDownEvent)
  startGame();
  setBoardWidth();

  window.addEventListener('resize', setBoardWidth);
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', keyDownEvent);
})
</script>