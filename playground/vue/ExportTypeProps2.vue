<script setup lang="ts">
import type { FooProps } from './ExportTypeProps1.vue'
defineProps<FooProps>()
</script>

<template>
  <div>bar: {{ title }}</div>
</template>
