<script setup lang="ts">
import { reactive } from 'vue';

defineEmits(['change']);

const props = defineProps<{
  value: boolean;
  label: string;
}>();

const state = reactive({
  value: props.value
});
</script>

<template>
  <label class="settings-checkbox">
    <span class="settings-checkbox__label"> {{ props.label }}</span>
    <input type="checkbox" v-model="state.value" class="settings-checkbox__input" @change="$emit('change', state.value)" />
  </label>
</template>

<style scoped></style>
