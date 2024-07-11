<template>
  <h2>Ts Import</h2>
  <p class="ts-import">{{ foo }}</p>
  <p class="ts-import2">{{ foo2 }}</p>
</template>

<script setup lang="ts">
import { foo } from '@/TsImportFile'
import { foo as foo2 } from '/@/TsImportFile'
</script>
