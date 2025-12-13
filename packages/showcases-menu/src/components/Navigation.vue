<script setup lang="ts">
import { useRouterStore } from '@Menu/stores/RouterStore';
import type { TNavOption } from '@ShowcasesShared';

// TODO DESKTOP: test i18n (for desktop also)
// TODO DESKTOP: add version to html body
// TODO DESKTOP: add init event with version and platform

withDefaults(
  defineProps<{
    options?: ReadonlyArray<TNavOption>;
    backBtn?: boolean;
  }>(),
  {
    options: () => [],
    backBtn: false
  }
);
</script>

<template>
  <div class="navigation">
    <ul class="navigation__list">
      <li v-for="option in options" :key="option.id" class="navigation__list-item">
        <button type="button" class="navigation__button" :disabled="option.disabled" @click="option.action()">
          {{ option.label }}
        </button>
      </li>
      <li v-if="backBtn" class="navigation__list-item -back">
        <button type="button" class="navigation__button" @click="useRouterStore().goBack()">Back</button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  flex-direction: column;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__button {
    outline-style: none;
    white-space: nowrap;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    border: 1px solid black;
    border-radius: 6px;
    min-height: 42px;
    width: 100%;
    cursor: pointer;
  }
}
</style>
