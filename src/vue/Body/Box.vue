<template>
  <div :id="box_class" :class="box_value" ref="box_class">{{value}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    box_num: {
      type: Number,
      default: 999,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
      required: false,
    },
    direction: {
      type: String,
      default: "none",
      required: false,
    },
  },
  data(){
    return {
      box_class: "box" + this.box_num,
      box_value: "val" + this.value,
      priority:0,
    }
  },
  methods: {
    changePriority(box_size:number){
      const box_tatoal = box_size*box_size
      const priority_levels = ["extremely", "very", "rather", "faierly"];

      if (this.direction == "s"){
        for(var i = 0 ; i < box_size ; i++){
          if (box_size*(box_size-i) < this.value && this.value < box_size*(box_size - i +1)){
            this.priority = priority_levels[i];
            break;
          }
        }
      }
      else if(this.direction == 'a'){
        for(var i = 0 ; i < box_size ; i++){
          if (box_size*(box_size-i) < this.value && this.value < box_size*(box_size - i +1)){
            this.priority = priority_levels[i];
            break;
          }
        }
      }
      else if(this.direction == 'd'){
        for(var i = 0 ; i < box_size ; i++){
          if (box_size*(box_size-i) < this.value && this.value < box_size*(box_size - i +1)){
            this.priority = priority_levels[i];
            break;
          }
        }
      }
      else if(this.direction == 'c'){
        for(var i = 0 ; i < box_size ; i++){
          if (box_size*(box_size-i) < this.value && this.value < box_size*(box_size - i +1)){
            this.priority = priority_levels[i];
            break;
          }
        }
      }
    }
  }
})
</script>