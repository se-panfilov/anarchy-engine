<script setup lang="ts">
import Navigation from '@Showcases/Menu/components/Navigation.vue';
import PageTitle from '@Showcases/Menu/components/PageTitle.vue';
import { Routes } from '@Showcases/Menu/constants';
import type { TVueNavOption } from '@Showcases/Menu/models';
import { eventsService, vueTranslationService } from '@Showcases/Menu/services';
import { useMenuOptionsStore } from '@Showcases/Menu/stores/MenuOptionsStore';
import { useRouterStore } from '@Showcases/Menu/stores/RouterStore';
import type { ShallowRef } from 'vue';

const { $t } = vueTranslationService;
const menuRouterStore = useRouterStore();

const viewTitleText: ShallowRef<string> = $t('main-menu.home.game-title');
const continueGameButtonText: ShallowRef<string> = $t('main-menu.home.button.continue-game.text');
const newGameButtonText: ShallowRef<string> = $t('main-menu.home.button.new-game.text');
const loadGameButtonText: ShallowRef<string> = $t('main-menu.home.button.load-game.text');
const settingsButtonText: ShallowRef<string> = $t('main-menu.home.button.settings.text');
const closeMenuButtonText: ShallowRef<string> = $t('main-menu.home.button.close-menu.text');

const navOptions: ReadonlyArray<TVueNavOption> = [
  {
    id: 0,
    name: 'continue-game',
    label: continueGameButtonText,
    action: () => eventsService.emitContinueGame()
  },
  {
    id: 1,
    name: 'new-game',
    label: newGameButtonText,
    disabled: true,
    action: () => eventsService.emitStartNewGame()
  },
  {
    id: 2,
    name: 'load-game',
    label: loadGameButtonText,
    action: () => eventsService.emitLoadGame()
  },
  {
    id: 3,
    name: 'settings',
    label: settingsButtonText,
    action: () => menuRouterStore.go(Routes.Settings)
  },
  {
    id: 4,
    name: 'credits',
    label: closeMenuButtonText,
    condition: useMenuOptionsStore().showExitBtn,
    action: () => eventsService.emitCloseMenu()
  }
];
</script>

<template>
  <div class="home">
    <PageTitle class="home__title" :title="viewTitleText" />
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
