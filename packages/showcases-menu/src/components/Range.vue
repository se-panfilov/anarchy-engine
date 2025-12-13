<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    min: number;
    max: number;
    label: string;
    step?: number;
  }>(),
  {
    step: 1
  }
);

const [modelValue] = defineModel<number>({ set: Number });
</script>

<template>
  <label class="range">
    <span class="range__label"> {{ props.label }}</span>
    <span class="range__input-container">
      <input v-model="modelValue" type="range" :min="min" :max="max" class="range__input" />
      <span class="range__value-helper"> {{ modelValue }}</span>
    </span>
  </label>
</template>

<style scoped lang="scss">
@use 'anarchy-shared/src/assets/_utils' as anarchy_utils;
@use 'anarchy-shared/src/assets/_constants' as anarchy_constants;

.range {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    font-weight: 500;
    font-size: anarchy_utils.px-to-rem(14px);
    line-height: anarchy_constants.$label-line-height;
  }

  &__input-container {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  &__input {
    width: 100%;
    cursor: pointer;
  }

  &__value-helper {
    font-weight: 500;
    font-size: anarchy_utils.px-to-rem(16px);
    line-height: anarchy_constants.$label-line-height;
  }
}
</style>
