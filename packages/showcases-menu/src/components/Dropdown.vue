<script setup lang="ts" generic="T">
import type { TDropdownOption } from '@Showcases/Shared';

const props = defineProps<{
  label: string;
  options: ReadonlyArray<TDropdownOption<T>>;
}>();

const modelValue = defineModel<T>();
</script>

<template>
  <label class="dropdown">
    <span class="dropdown__label"> {{ props.label }}</span>
    <select v-model="modelValue" class="dropdown__input">
      <option v-for="(option, idx) in props.options" :key="idx" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped lang="scss">
@use '@hellpig/anarchy-shared/assets/_utils.scss' as anarchy_utils;
@use '@hellpig/anarchy-shared/assets/_constants.scss' as anarchy_constants;

.dropdown {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    font-weight: 500;
    font-size: anarchy_utils.px-to-rem(14px);
    line-height: anarchy_constants.$label-line-height;
  }

  &__input {
    font-weight: 500;
    font-size: anarchy_utils.px-to-rem(16px);
    line-height: anarchy_constants.$label-line-height;
    border: 1px solid black;
    border-radius: 6px;
    min-height: 42px;
    padding: 0 8px;
    cursor: pointer;
  }
}
</style>
