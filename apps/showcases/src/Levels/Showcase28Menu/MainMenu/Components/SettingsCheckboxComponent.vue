<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();

const modelValue = defineModel<boolean>();
</script>

<template>
  <label class="settings-checkbox">
    <span class="settings-checkbox__label"> {{ props.label }}</span>
    <input type="checkbox" v-model="modelValue" class="settings-checkbox__input" />
  </label>
</template>

<style scoped></style>
