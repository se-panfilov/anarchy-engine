<script setup lang="ts">
import { vueTranslationService } from '@Showcases/i18n';
import { NavDirection, NavStyle } from '@Showcases/Menu/components/Navigation/constants';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import PageTitle from '@Showcases/Menu/components/PageTitle.vue';
import { Routes } from '@Showcases/Menu/constants';
import type { TVueNavOption } from '@Showcases/Menu/models';
import { eventsService } from '@Showcases/Menu/services';
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
const exitAppButtonText: ShallowRef<string> = $t('main-menu.home.button.exit-app.text');
const legalButtonText: ShallowRef<string> = $t('main-menu.home.button.legal.text');

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
    name: 'close-menu',
    label: closeMenuButtonText,
    action: () => eventsService.emitCloseMenu()
  },
  {
    id: 5,
    name: 'exit-app',
    label: exitAppButtonText,
    condition: useMenuOptionsStore().showExitBtn,
    action: () => eventsService.emitExitApp()
  }
];

const linksOptions: ReadonlyArray<TVueNavOption> = [
  {
    id: 0,
    name: 'legal-view',
    label: legalButtonText,
    action: () => menuRouterStore.go(Routes.Legal)
  }
];
</script>

<template>
  <div class="home">
    <PageTitle class="home__title" :title="viewTitleText" />
    <Navigation class="home__navigation" :options="navOptions" />
    <div class="home__footer">
      <Navigation class="home__links" :options="linksOptions" :direction="NavDirection.Horizontal" :style="NavStyle.Links" />
    </div>
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

  &__footer {
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    width: 100%;
  }

  &__links {
    justify-content: flex-end;
    padding: 0 10px;
  }
}
</style>
