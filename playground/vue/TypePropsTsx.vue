<script setup lang="tsx">
import type { Props } from './types'

const props = defineProps<Props & { bar: string }>()
</script>

<template>
  <h2>Imported Type Props</h2>
  <pre class="type-props-tsx">{{ props }}</pre>
</template>
