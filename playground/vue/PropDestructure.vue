<script setup>
const { bar: baz } = defineProps(['foo'])
</script>

<template>
  <h2>Prop Destructure</h2>
  <p>Prop bar: {{ baz }}</p>
</template>
