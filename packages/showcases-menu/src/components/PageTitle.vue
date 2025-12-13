<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <h1 class="page-title">{{ title }}</h1>
</template>

<style scoped lang="scss">
@use 'anarchy-shared/src/assets/utils' as anarchy_utils;

.page-title {
  letter-spacing: 2.1px;
  font-size: anarchy_utils.px-to-rem(64px);
  line-height: 44px;
  text-transform: uppercase;
  text-align: center;
}
</style>
