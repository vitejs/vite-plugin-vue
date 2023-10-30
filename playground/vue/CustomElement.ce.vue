<template>
  <h2 class="custom-element">Custom Element</h2>
  <ceC></ceC>
</template>

<script setup>
import ceC from './CustomElementC.vue'
console.log(ceC)
</script>

<style lang="scss">
$color: magenta;

.custom-element {
  color: $color;
}
</style>
