<script setup lang="ts">
import type { TNavOption } from '@Menu/models';
import { useRouterStore } from '@Menu/stores/RouterStore';

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
  <div class="menu-navigation">
    <ul class="menu-navigation__list flex flex-col gap-4 w-64">
      <li v-for="option in options" :key="option.id" class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button" @click="option.action()">
          {{ option.label }}
        </button>
      </li>
      <li v-if="backBtn" class="menu-navigation__list-item -back">
        <button type="button" class="menu-navigation__button" @click="useRouterStore().goBack()">Back</button>
      </li>
    </ul>
  </div>
</template>
