<template>
    <div>
        <h1>{{ title }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup(){
        return {
            title: "2048",
        }
    }
})
</script>