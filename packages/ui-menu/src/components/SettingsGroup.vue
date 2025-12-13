<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="settings-group">
    <div class="settings-group__title">{{ title }}</div>
    <slot name="default" />
  </div>
</template>

<style scoped></style>
