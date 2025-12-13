<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <h1 class="page-title">{{ title }}</h1>
</template>

<style scoped lang="scss">
.page-title {
  // TODO DESKTOP: add px-to-rem function (to shared?)
  // TODO DESKTOP: Add font-family
  letter-spacing: 2.1px;
  font-size: 42px;
  line-height: 44px;
  text-transform: uppercase;
  text-align: center;
}
</style>
