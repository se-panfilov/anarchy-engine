<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();

const modelValue = defineModel<boolean>();
</script>

<template>
  <label class="checkbox">
    <span class="checkbox__label"> {{ props.label }}</span>
    <input v-model="modelValue" type="checkbox" class="checkbox__input" />
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  &__label {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
