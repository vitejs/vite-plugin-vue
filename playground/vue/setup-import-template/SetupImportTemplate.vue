<template src="./template.html"></template>
<script setup>
import { ref } from 'vue'
const count = ref(0)
const inc = () => count.value++
</script>
