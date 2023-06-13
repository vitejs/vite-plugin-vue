<script>
export default {
  name: 'CompA',
  setup() {
    return {
      message: 'hello A',
    }
  },
}
</script>

<template>
  <span>{{ message }}</span>
</template>
