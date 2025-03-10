<template>
  <div class="export-type-props1">{{ props }}</div>
</template>

<script lang="ts">
export interface FooProps {
  msg: string
}
</script>

<script setup lang="ts">
const props = defineProps<FooProps>()
</script>

<style>
.export-type-props1 {
  color: red;
}
</style>
