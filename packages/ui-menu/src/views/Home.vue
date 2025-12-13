<script setup lang="ts">
import Navigation from '@Menu/components/Navigation.vue';
import { Routes } from '@Menu/constants';
import type { TNavOption } from '@Menu/models';
import { eventsService } from '@Menu/services';
import { useMenuOptionsStore } from '@Menu/stores/MenuOptionsStore';
import { useRouterStore } from '@Menu/stores/RouterStore';

const menuRouterStore = useRouterStore();

const navOptions: ReadonlyArray<TNavOption> = [
  {
    id: 0,
    label: 'Continue',
    action: () => eventsService.emitContinue()
  },
  {
    id: 1,
    label: 'Start new game',
    action: () => eventsService.emitStartNew()
  },
  {
    id: 2,
    label: 'Load game',
    action: () => eventsService.emitLoad()
  },
  {
    id: 3,
    label: 'Settings',
    action: () => menuRouterStore.go(Routes.Settings)
  },
  {
    id: 4,
    label: 'Close menu',
    condition: useMenuOptionsStore().showExitBtn,
    action: () => eventsService.emitClose()
  }
];
</script>

<template>
  <div class="home">
    <h1 class="home__title">Game title</h1>
    <Navigation class="home__navigation" :options="navOptions" />
  </div>
</template>
