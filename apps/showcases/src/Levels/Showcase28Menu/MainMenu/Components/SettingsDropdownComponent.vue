<script setup lang="ts" generic="T">
import type { TDropdownOption } from '@/Levels/Showcase28Menu/MainMenu/Models';

const props = defineProps<{
  label: string;
  options: ReadonlyArray<TDropdownOption<T>>;
}>();

const modelValue = defineModel<T>();
</script>

<template>
  <label class="settings-dropdown">
    <span class="settings-dropdown__label"> {{ props.label }}</span>
    <select v-model="modelValue" class="settings-dropdown__input">
      <option v-for="(option, idx) in props.options" :key="idx" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped></style>
