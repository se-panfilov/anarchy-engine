<script setup lang="ts">
import { NavDirection, NavStyle } from '@Showcases/Menu/components/Navigation/constants';
import type { TVueNavOption } from '@Showcases/Menu/models';
import { vueTranslationService } from '@Showcases/Menu/services';
import { useRouterStore } from '@Showcases/Menu/stores/RouterStore';
import type { ShallowRef } from 'vue';

const { $t } = vueTranslationService;

// TODO DESKTOP: add version to html body
// TODO DESKTOP: add init event with version and platform

withDefaults(
  defineProps<{
    options?: ReadonlyArray<TVueNavOption>;
    backBtn?: boolean;
    direction?: NavDirection;
    style?: NavStyle;
  }>(),
  {
    options: () => [],
    backBtn: false,
    direction: NavDirection.Vertical,
    style: NavStyle.Buttons
  }
);

const backButtonText: ShallowRef<string> = $t('main-menu.navigation.back-button.text');
</script>

<template>
  <div class="navigation" :class="`--style-${style}`">
    <ul class="navigation__list" :class="`--${direction}`">
      <li v-for="option in options" :key="option.id" :class="`navigation__list-item --${option.name}`">
        <button type="button" class="navigation__button" :disabled="option.disabled" @click="option.action()">
          {{ option.label }}
        </button>
      </li>
      <li v-if="backBtn" class="navigation__list-item -back">
        <button type="button" class="navigation__button" @click="useRouterStore().goBack()">{{ backButtonText }}</button>
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

    &.--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px;
    }
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

  &.--style-links {
    & .navigation__button {
      background: none;
      border: none;
      padding: 0;
      text-decoration: underline;
    }
  }
}
</style>
