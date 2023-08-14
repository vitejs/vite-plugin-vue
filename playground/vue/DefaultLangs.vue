<template lang="html">
  <h2>default langs</h2>
  <div>
    default lang: <span class="default-langs">{{ foo }}</span>
  </div>
</template>

<script setup lang="js">
const foo = 'foo'
</script>

<style scoped lang="css">
.default-langs {
  color: blue;
}
</style>
