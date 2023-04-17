<script setup lang="ts">
import type { Props } from './types'
import type { Aliased } from '~types'

const props = defineProps<Props & Aliased & { bar: string }>()
</script>

<template>
  <h2>Imported Type Props</h2>
  <pre class="type-props">{{ props }}</pre>
</template>
