<script setup lang="ts">
import { reactive, watch } from 'vue';

defineEmits(['change']);

const props = defineProps<{
  value: boolean;
  label: string;
}>();

const state = reactive({
  value: props.value
});

watch(
  () => props.value,
  (newVal: boolean): void => {
    if (state.value !== newVal) state.value = newVal;
  }
);
</script>

<template>
  <label class="settings-checkbox">
    <span class="settings-checkbox__label"> {{ props.label }}</span>
    <input type="checkbox" v-model="state.value" class="settings-checkbox__input" @change="$emit('change', state.value)" />
  </label>
</template>

<style scoped></style>
