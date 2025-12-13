<script setup lang="ts">
import { vueTranslationService } from '@Showcases/i18n';
import type { ShallowRef } from 'vue';

defineEmits(['reset']);

const { $t } = vueTranslationService.useTranslations();

const saveBtnText: ShallowRef<string> = $t('view-actions.button.text.save');
const resetBtnText: ShallowRef<string> = $t('view-actions.button.text.reset');
</script>

<template>
  <div class="view-actions">
    <button type="button" class="view-actions__btn -reset" @click="$emit('reset')">{{ resetBtnText }}</button>
    <button type="submit" class="view-actions__btn -save">{{ saveBtnText }}</button>
  </div>
</template>

<style scoped lang="scss">
@use 'anarchy-shared/src/assets/_utils' as anarchy_utils;
@use 'anarchy-shared/src/assets/_constants' as anarchy_constants;

.view-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  gap: 8px;

  &__btn {
    outline-style: none;
    font-weight: 500;
    font-size: anarchy_utils.px-to-rem(16px);
    line-height: anarchy_constants.$button-line-height;
    border: 1px solid black;
    border-radius: 6px;
    min-height: 42px;
    width: 100%;
    padding: 0 16px;
    cursor: pointer;
  }
}
</style>
