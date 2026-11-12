<template>
  <h2 class="hmr">HMR</h2>
  <p>Click the button then edit this message. The count should be preserved.</p>
  <button class="hmr-inc" @click="count++">count is {{ count }}</button>
  <span class="hmr-number">{{ number }}</span>
  <div>
    <span class="hmr-bar-text">bar-title</span>
    <span class="hmr-bar">{{ bar }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Node from './Node.vue'
import { test } from './lib.js'
const number = test()

let foo: number = 0
let bar = 'bar'

const count = ref(foo)
</script>

<style>
.hmr-inc {
  color: red;
}
</style>
