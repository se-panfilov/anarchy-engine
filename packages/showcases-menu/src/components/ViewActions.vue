<script setup lang="ts">
import { vueTranslationService } from '@Showcases/Menu/services';
import type { ShallowRef } from 'vue';

defineEmits(['reset']);

const { $t } = vueTranslationService;

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
.view-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  gap: 8px;

  &__btn {
    outline-style: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    border: 1px solid black;
    border-radius: 6px;
    min-height: 42px;
    width: 100%;
    padding: 0 16px;
    cursor: pointer;
  }
}
</style>
