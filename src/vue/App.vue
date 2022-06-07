<template>
 <div>
   <Header></Header>
   <Body></Body>
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from "./Header.vue"
import Body from "./Body.vue"
export default defineComponent({
  name: 'App',
  components: {
    Header,
    Body
  }
})
</script>