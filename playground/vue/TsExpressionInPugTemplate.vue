<template lang="pug">
h2.ts-expression-title Ts expression in template
button.ts-expression(@click="(foo as number)++")
  | {{ foo }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const foo = ref(0)
</script>
