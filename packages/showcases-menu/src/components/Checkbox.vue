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
@use '@hellpig/anarchy-shared/assets/_constants.scss' as anarchy_constants;
@use '@hellpig/anarchy-shared/assets/_utils.scss' as anarchy_utils;

.checkbox {
  display: flex;
  flex-direction: row-reverse;
  align-self: baseline;
  gap: 8px;

  &__label {
    font-weight: 500;
    font-size: anarchy_utils.px-to-rem(14px);
    line-height: anarchy_constants.$label-line-height;
  }
}
</style>
