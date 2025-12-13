<script setup lang="ts" generic="T">
import { reactive, watch } from 'vue';

defineEmits(['change']);

type TOptions<T> = Readonly<{
  value: T;
  label: string;
}>;

const props = defineProps<{
  value: T;
  label: string;
  options: ReadonlyArray<TOptions<T>>;
}>();

const state = reactive({
  value: props.value
});

watch(
  () => props.value,
  (newVal: T): void => {
    if (state.value !== newVal) state.value = newVal as any;
  }
);
</script>

<template>
  <label class="settings-dropdown">
    <span class="settings-dropdown__label"> {{ props.label }}</span>
    <select v-model="state.value" class="settings-dropdown__input" @change="$emit('change', state.value)">
      <option v-for="(option, idx) in props.options" :key="idx" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped></style>
