<template>
  <h3>Custom Element Child</h3>
  <button class="custom-element-c" type="button" @click="state.count++">
    count: {{ state.count }} <slot></slot>
  </button>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue'
defineProps({
  label: String,
})

const state = reactive({ count: 0 })

onBeforeMount(() => {
  state.count = 1
})
</script>

<style lang="scss">
.custom-element-c {
  color: red;
}
</style>
