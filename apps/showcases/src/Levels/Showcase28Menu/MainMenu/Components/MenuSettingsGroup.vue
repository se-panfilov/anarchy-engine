<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="menu-settings-group">
    <div class="menu-settings-group__title">{{ title }}</div>
    <slot name="default"></slot>
  </div>
</template>

<style scoped></style>
