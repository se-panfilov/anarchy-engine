<script setup lang="ts">
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { vueTranslationService } from '@Showcases/i18n';
import { NavDirection, NavStyle } from '@Showcases/Menu/components/Navigation/constants';
import type { TVueNavOption } from '@Showcases/Menu/models';
import { useRouterStore } from '@Showcases/Menu/stores/RouterStore';
import type { ComputedRef, ShallowRef } from 'vue';
import { computed } from 'vue';

const { $t } = vueTranslationService.useTranslations();

const props = withDefaults(
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

const filteredOptions: ComputedRef<ReadonlyArray<TVueNavOption>> = computed(
  (): ReadonlyArray<TVueNavOption> =>
    props.options?.filter((option) => {
      if (isNotDefined(option.condition)) return true;
      return option.condition;
    }) ?? []
);

const backButtonText: ShallowRef<string> = $t('main-menu.navigation.back-button.text');
</script>

<template>
  <div class="navigation" :class="`--style-${style}`">
    <ul class="navigation__list" :class="`--${direction}`">
      <li v-for="option in filteredOptions" :key="option.id" :class="`navigation__list-item --${option.name}`">
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
@use 'anarchy-shared/src/assets/_utils' as anarchy_utils;

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
    font-size: anarchy_utils.px-to-rem(16px);
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
