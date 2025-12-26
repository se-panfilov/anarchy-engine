<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <h1 class="page-title">{{ title }}</h1>
</template>

<style scoped lang="scss">
@use '@hellpig/anarchy-shared/assets/_utils.scss' as anarchy_utils;
@use '@hellpig/anarchy-shared/assets/_constants.scss' as anarchy_constants;

.page-title {
  letter-spacing: 2.1px;
  font-size: anarchy_utils.px-to-rem(64px);
  line-height: anarchy_constants.$big-title-line-height;
  text-transform: uppercase;
  text-align: center;
  word-break: break-word;
}
</style>
