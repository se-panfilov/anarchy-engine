<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="menu-settings-view">
    <div class="menu-settings-view__title">{{ title }}</div>
    <slot name="default"></slot>
  </div>
</template>

<style scoped></style>
