<template>
  <h2 class="hmr-circular-reference">HMR Circular reference</h2>
  <p>Click the button then edit this message. The count should be preserved.</p>
  <button class="hmr-circular-reference-inc" @click="count++">
    count is {{ count }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Node from './Node.vue'

defineProps<App.User>()

let foo: number = 0

const count = ref(foo)
</script>

<style>
.hmr-circular-reference-inc {
  color: red;
}
</style>
