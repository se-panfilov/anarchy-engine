<script setup lang="ts">
import Navigation from '@Showcases/Menu/components/Navigation.vue';
import PageTitle from '@Showcases/Menu/components/PageTitle.vue';
import { Routes } from '@Showcases/Menu/constants';
import { vueTranslationService } from '@Showcases/Menu/services';
import { useRouterStore } from '@Showcases/Menu/stores/RouterStore';
import type { TNavOption } from '@Showcases/Shared';
import type { ShallowRef } from 'vue';

const { $t } = vueTranslationService;
const menuRouterStore = useRouterStore();

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.view.title');

// TODO DESKTOP: replace stings with $t refs
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
    <PageTitle class="settings__title" :title="viewTitleText" />
    <Navigation class="settings__navigation" :options="navOptions" :back-btn="true" />
  </div>
</template>
