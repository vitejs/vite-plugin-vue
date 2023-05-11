<script setup lang="ts" generic="T extends string">
defineProps<{ msg: T }>()
</script>

<template>
  <h2>TS with Generics</h2>
  <div class="generic">{{ msg }}</div>
</template>
