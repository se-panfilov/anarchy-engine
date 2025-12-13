<script setup lang="ts">
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import PageTitle from '@Showcases/Menu/components/PageTitle.vue';
import { Routes } from '@Showcases/Menu/constants';
import type { TVueNavOption } from '@Showcases/Menu/models';
import { vueTranslationService } from '@Showcases/Menu/services';
import { useRouterStore } from '@Showcases/Menu/stores/RouterStore';
import type { ShallowRef } from 'vue';

const { $t } = vueTranslationService;
const menuRouterStore = useRouterStore();

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.view.title');

const graphicsButtonText: ShallowRef<string> = $t('main-menu.settings.button.graphics.text');
const audioButtonText: ShallowRef<string> = $t('main-menu.settings.button.audio.text');
const localizationButtonText: ShallowRef<string> = $t('main-menu.settings.button.localization.text');

const navOptions: ReadonlyArray<TVueNavOption> = [
  {
    id: 0,
    name: 'graphics',
    label: graphicsButtonText,
    action: () => menuRouterStore.go(Routes.Graphics)
  },
  {
    id: 1,
    name: 'audio',
    label: audioButtonText,
    action: () => menuRouterStore.go(Routes.Audio)
  },
  {
    id: 2,
    name: 'controls',
    label: localizationButtonText,
    action: () => menuRouterStore.go(Routes.Localization)
  }
];
</script>

<template>
  <div class="settings">
    <PageTitle class="settings__title" :title="viewTitleText" />
    <Navigation class="settings__navigation" :options="navOptions" :back-btn="true" />
  </div>
</template>
