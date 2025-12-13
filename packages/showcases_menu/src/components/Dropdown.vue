<script setup lang="ts" generic="T">
import type { TDropdownOption } from '@ShowcasesShared';

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
.dropdown {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__label {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  &__input {
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    border: 1px solid black;
    border-radius: 6px;
    min-height: 42px;
    padding: 0 8px;
    cursor: pointer;
  }
}
</style>
