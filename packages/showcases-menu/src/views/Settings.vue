<script setup lang="ts">
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import PageTitle from '@Showcases/Menu/components/PageTitle.vue';
import { Routes } from '@Showcases/Menu/constants';
import type { TVueNavOption } from '@Showcases/Menu/models';
import { useRouterStore } from '@Showcases/Menu/stores/RouterStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const menuRouterStore = useRouterStore();
const navOptions: ReadonlyArray<TVueNavOption> = [
  {
    id: 0,
    name: 'graphics',
    label: t('main-menu.settings.button.graphics.text'),
    action: () => menuRouterStore.go(Routes.Graphics)
  },
  {
    id: 1,
    name: 'audio',
    label: t('main-menu.settings.button.audio.text'),
    action: () => menuRouterStore.go(Routes.Audio)
  },
  {
    id: 2,
    name: 'controls',
    label: t('main-menu.settings.button.localization.text'),
    action: () => menuRouterStore.go(Routes.Localization)
  }
];
</script>

<template>
  <div class="settings">
    <PageTitle class="settings__title" :title="$t('main-menu.settings.view.title')" />
    <Navigation class="settings__navigation" :options="navOptions" :back-btn="true" />
  </div>
</template>
