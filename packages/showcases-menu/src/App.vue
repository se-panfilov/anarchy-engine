<script setup lang="ts">
import './assets/style.scss';

import RouterView from '@Menu/components/RouterView.vue';
import { eventsService } from '@Menu/services';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { Subscription } from 'rxjs';
import { filter } from 'rxjs';
import type { TLocalesMapping, TMessages } from 'showcases_i18n';
import { TranslateService } from 'showcases_i18n';
import { onMounted, onUnmounted } from 'vue';

let appEventsSub$: Subscription | undefined;

// TODO DESKTOP: DEBUG CODE
enum Locales {
  en = 'en',
  nl = 'nl'
}
const loaders: TLocalesMapping<Locales> = {
  en: () => import('./locales/en.json').then((m) => (m.default ?? m) as TMessages),
  nl: () => import('./locales/nl.json').then((m) => (m.default ?? m) as TMessages)
} as const;

const i18n = TranslateService<Locales>(Locales.en, Locales.en, loaders);

i18n.ready$.pipe(filter(Boolean)).subscribe(() => {
  console.log('XXX1', i18n.translate('menu.start'));
  i18n.locale$.next(Locales.nl);
  console.log('XXX2', i18n.translate('menu.start'));
  console.log(i18n.translate('hud.fps', { count: '60' }));
  console.log(i18n.formatNumber(1234.56, { style: 'currency', currency: 'EUR' }));
});
// TODO DESKTOP: DEBUG CODE END

onMounted((): void => {
  appEventsSub$ = eventsService.startListeningAppEvents();
  eventsService.emitLoadMenuSettings();
});

onUnmounted((): void => appEventsSub$?.unsubscribe());

function save(): void {
  eventsService.emitSaveMenuSettings(useSettingsStore().state);
}
</script>

<template>
  <div class="main-menu">
    <RouterView class="main-menu__item -view" @save="save" />
  </div>
</template>

<style scoped lang="scss">
.main-menu {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
}
</style>
