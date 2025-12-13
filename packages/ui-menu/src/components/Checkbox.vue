<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();

const modelValue = defineModel<boolean>();
</script>

<template>
  <label class="settings-checkbox">
    <span class="settings-checkbox__label"> {{ props.label }}</span>
    <input v-model="modelValue" type="checkbox" class="settings-checkbox__input" />
  </label>
</template>

<style scoped></style>
