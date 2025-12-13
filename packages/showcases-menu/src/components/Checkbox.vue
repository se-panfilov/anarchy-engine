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
@use 'anarchy-shared/src/assets/utils' as anarchy_utils;

.checkbox {
  display: flex;
  flex-direction: row-reverse;
  align-self: baseline;
  gap: 8px;

  &__label {
    font-weight: 500;
    font-size: anarchy_utils.px-to-rem(14px);
    line-height: 16px;
  }
}
</style>
