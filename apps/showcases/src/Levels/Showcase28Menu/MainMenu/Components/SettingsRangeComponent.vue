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

const [modelValue] = defineModel<number>({
  set(value) {
    return Number(value);
  }
});
</script>

<template>
  <label class="settings-range">
    <span class="settings-range__label"> {{ props.label }}</span>
    <input type="range" :min="min" :max="max" v-model="modelValue" class="settings-range__input" />
    <span class="settings-range__value-helper"> {{ modelValue }}</span>
  </label>
</template>

<style scoped></style>
