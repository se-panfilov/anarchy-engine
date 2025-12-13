<script setup lang="ts">
import Navigation from '@Menu/components/Navigation.vue';
import PageTitle from '@Menu/components/PageTitle.vue';
import { Routes } from '@Menu/constants';
import { eventsService } from '@Menu/services';
import { useMenuOptionsStore } from '@Menu/stores/MenuOptionsStore';
import { useRouterStore } from '@Menu/stores/RouterStore';
import type { TNavOption } from '@ShowcasesShared';

const menuRouterStore = useRouterStore();

const navOptions: ReadonlyArray<TNavOption> = [
  {
    id: 0,
    label: 'Continue',
    action: () => eventsService.emitContinueGame()
  },
  {
    id: 1,
    label: 'New game',
    disabled: true,
    action: () => eventsService.emitStartNewGame()
  },
  {
    id: 2,
    label: 'Load game',
    action: () => eventsService.emitLoadGame()
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
    action: () => eventsService.emitCloseMenu()
  }
];
</script>

<template>
  <div class="home">
    <PageTitle class="home__title" title="Game title" />
    <Navigation class="home__navigation" :options="navOptions" />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  min-width: 100%;
  min-height: 100%;
  align-items: center;
  flex-direction: column;
  gap: 14px;
}
</style>
