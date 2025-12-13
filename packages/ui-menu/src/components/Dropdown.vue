<script setup lang="ts" generic="T">
import type { TDropdownOption } from '@Menu/models';

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

<style scoped></style>
