<script setup lang="ts">
import Navigation from '@Menu/components/Navigation.vue';
import PageTitle from '@Menu/components/PageTitle.vue';
import { Routes } from '@Menu/constants';
import { useRouterStore } from '@Menu/stores/RouterStore';
import type { TNavOption } from '@ShowcasesShared';

const menuRouterStore = useRouterStore();

const navOptions: ReadonlyArray<TNavOption> = [
  {
    id: 0,
    label: 'Graphics',
    action: () => menuRouterStore.go(Routes.Graphics)
  },
  {
    id: 1,
    label: 'Audio',
    action: () => menuRouterStore.go(Routes.Audio)
  },
  {
    id: 2,
    label: 'Localization',
    action: () => menuRouterStore.go(Routes.Localization)
  }
];
</script>

<template>
  <div class="settings">
    <PageTitle class="settings__title" title="Settings" />
    <Navigation class="settings__navigation" :options="navOptions" :back-btn="true" />
  </div>
</template>
