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
@use '@hellpig/anarchy-shared/assets/_utils.scss' as anarchy_utils;
@use '@hellpig/anarchy-shared/assets/_constants.scss' as anarchy_constants;

.settings-group {
  display: flex;
  flex-direction: column;
  gap: 28px;

  &__title {
    font-weight: 500;
    font-size: anarchy_utils.px-to-rem(18px);
    line-height: anarchy_constants.$small-title-line-height;
    margin-bottom: 8px;
  }
}
</style>
