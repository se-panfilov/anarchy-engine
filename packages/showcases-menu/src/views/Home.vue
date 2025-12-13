<script setup lang="ts">
import { NavDirection, NavStyle } from '@Showcases/Menu/components/Navigation/constants';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import PageTitle from '@Showcases/Menu/components/PageTitle.vue';
import { Routes } from '@Showcases/Menu/constants';
import type { TVueNavOption } from '@Showcases/Menu/models';
import { eventsEmitterService } from '@Showcases/Menu/services';
import { useMenuOptionsStore } from '@Showcases/Menu/stores/MenuOptionsStore';
import { useRouterStore } from '@Showcases/Menu/stores/RouterStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const menuRouterStore = useRouterStore();

const navOptions: ReadonlyArray<TVueNavOption> = [
  {
    id: 0,
    name: 'continue-game',
    label: t('main-menu.home.button.continue-game.text'),
    action: () => eventsEmitterService.emitContinueGame()
  },
  {
    id: 1,
    name: 'new-game',
    label: t('main-menu.home.button.new-game.text'),
    disabled: true,
    action: () => eventsEmitterService.emitStartNewGame()
  },
  {
    id: 2,
    name: 'load-game',
    label: t('main-menu.home.button.load-game.text'),
    action: () => eventsEmitterService.emitLoadGame()
  },
  {
    id: 3,
    name: 'settings',
    label: t('main-menu.home.button.settings.text'),
    action: () => menuRouterStore.go(Routes.Settings)
  },
  {
    id: 4,
    name: 'close-menu',
    label: t('main-menu.home.button.close-menu.text'),
    action: () => eventsEmitterService.emitCloseMenu()
  },
  {
    id: 5,
    name: 'exit-app',
    label: t('main-menu.home.button.exit-app.text'),
    condition: useMenuOptionsStore().showExitBtn,
    action: () => eventsEmitterService.emitExitApp()
  }
];

const linksOptions: ReadonlyArray<TVueNavOption> = [
  {
    id: 0,
    name: 'legal-view',
    label: t('main-menu.home.button.legal.text'),
    action: () => menuRouterStore.go(Routes.Legal)
  }
];
</script>

<template>
  <div class="home">
    <PageTitle class="home__title" :title="$t('main-menu.home.game-title')" />
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
