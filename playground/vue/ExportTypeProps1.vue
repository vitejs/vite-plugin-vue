<template>
  <div class="export-type-props1">foo: {{ title }}</div>
</template>

<script lang="ts">
export interface FooProps {
  title?: string
}
</script>

<script setup lang="ts">
defineProps<FooProps>()
</script>

<style>
.export-type-props1 {
  color: red;
}
</style>
