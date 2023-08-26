<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CompC',
  setup() {
    return {
      message: 'hello C',
    }
  },
})
</script>

<template>
  <span>{{ message }}</span>
</template>
