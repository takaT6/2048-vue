<style>
.hello{
 color: red; /*cssが効いている事がわかりやすくする為に赤にする*/
}
</style>

<template>
 <span class="hello">{{ helloText }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup(){
    return{
      helloText: 'Hello World!'
    }
  }
})
</script>