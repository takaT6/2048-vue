<template>
  <button id="btnLeft">⇦</button>
  <button id="btnRight">⇨</button>
  <button id="btnUp">↑</button>
  <button id="btnDown" @click="btnDown_tap">↓</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const log = (mssg: string)=> console.log(mssg);

export default defineComponent({
  props: {
    box_size: {
      type: Number,
      default: 4,
      required: true,
    }
  },
	methods:{
		btnDown_tap(){
			log("Down button was tapped!");

		}
	}
})
</script>