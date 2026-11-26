<template>
  <p class="refresh-bug">This should render without $RefreshSig$ errors</p>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

// useSlots() triggers Oxc's React refresh pass because oxc keys off
// the "use" prefix, treating it like a React hook.
const slots = useSlots()
</script>
