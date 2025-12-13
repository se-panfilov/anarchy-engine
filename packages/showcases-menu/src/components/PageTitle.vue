<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <h1 class="page-title">{{ title }}</h1>
</template>

<style scoped lang="scss">
@use 'anarchy-shared/src/assets/_utils' as anarchy_utils;
@use 'anarchy-shared/src/assets/_constants' as anarchy_constants;

.page-title {
  letter-spacing: 2.1px;
  font-size: anarchy_utils.px-to-rem(64px);
  line-height: anarchy_constants.$big-title-line-height;
  text-transform: uppercase;
  text-align: center;
}
</style>
