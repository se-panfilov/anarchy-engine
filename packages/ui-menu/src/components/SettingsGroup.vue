<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="settings-group">
    <div v-if="title" class="settings-group__title">{{ title }}</div>
    <slot name="default" />
  </div>
</template>

<style scoped lang="scss">
.settings-group {
  display: flex;
  flex-direction: column;
  gap: 28px;

  &__title {
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 8px;
  }
}
</style>
