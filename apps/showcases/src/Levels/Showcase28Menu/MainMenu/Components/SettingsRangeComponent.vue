<script setup lang="ts">
import { reactive } from 'vue';

defineEmits(['change']);

const props = withDefaults(
  defineProps<{
    min: number;
    max: number;
    value: number;
    label: string;
    step?: number;
  }>(),
  {
    step: 1
  }
);

const state = reactive({
  value: props.value
});
</script>

<template>
  <label class="settings-range">
    <span class="settings-range__label"> {{ props.label }}</span>
    <input type="range" :min="min" :max="max" v-model="state.value" class="settings-range__input" @change="$emit('change', Number(state.value))" />
    <span class="settings-range__value-helper"> {{ state.value }}</span>
  </label>
</template>

<style scoped></style>
