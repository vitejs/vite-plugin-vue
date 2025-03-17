<template>
  <div class="export-type-props2">{{ props }}</div>
</template>

<script setup lang="ts">
import type { FooProps } from './ExportTypeProps1.vue'
const props = defineProps<FooProps>()
</script>
