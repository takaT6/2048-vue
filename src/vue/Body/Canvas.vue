<template>
  <div v-for="val in box_array" :key="val">
    <Box v-for="num in val" :key="num" :box_num="num"></Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Box from './Box.vue'

const log = (mssg: string)=> console.log(mssg);

export default defineComponent({
  components: {
    Box
  },
  props: {
    box_size: {
      type: Number,
      default: 4,
      required: true,
    }
  },
  data(){
    return {
      box_array: []
    }
  },
  methods: {
    createBoxArray(){
      console.log(this.box_size)
      const box_tatoal: Number = this.box_size*this.box_size;
      var array:Number[][] = [];
      for(var i = 0 ; i < box_tatoal ; i+=4){
        var array_in: Number[] =[];
        for(var j = i ; j < i + this.box_size ; j++){
          console.log(j)
          array_in.push(j);
        }
        array.push(array_in);
      }
      this.box_array = array;
      log("Boxes are created!")
    }
  }
  // comput/
})
</script>