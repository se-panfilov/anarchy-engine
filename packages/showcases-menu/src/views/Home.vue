<script setup lang="ts">
import Navigation from '@Showcases/Menu/components/Navigation.vue';
import PageTitle from '@Showcases/Menu/components/PageTitle.vue';
import { Routes } from '@Showcases/Menu/constants';
import { eventsService } from '@Showcases/Menu/services';
import { useMenuOptionsStore } from '@Showcases/Menu/stores/MenuOptionsStore';
import { useRouterStore } from '@Showcases/Menu/stores/RouterStore';
import type { TNavOption } from '@Showcases/Shared';

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
