<script setup lang="ts">
import Navigation from '@Menu/components/Navigation.vue';
import { Routes } from '@Menu/constants';
import type { TNavOption } from '@Menu/models';
import { useRouterStore } from '@Menu/stores/RouterStore';

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
    <Navigation class="settings__navigation" :options="navOptions" :back-btn="true" />
  </div>
</template>
