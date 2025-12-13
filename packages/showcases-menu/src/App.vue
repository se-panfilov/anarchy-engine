<script setup lang="ts">
import './assets/style.scss';

import RouterView from '@Showcases/Menu/components/RouterView.vue';
import { eventsService, vueTranslationService } from '@Showcases/Menu/services';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import { Locales } from '@Showcases/Shared';
import type { Observable, Subscription } from 'rxjs';
import type { ShallowRef } from 'vue';
import { onBeforeUnmount, onMounted, onUnmounted, shallowRef } from 'vue';

let appEventsSub$: Subscription | undefined;

const { t$ } = vueTranslationService;

function useText(obs$: Observable<string>): ShallowRef<string> {
  const r: ShallowRef<string> = shallowRef<string>('');
  let sub: Subscription | undefined;

  onMounted((): void => {
    // eslint-disable-next-line functional/immutable-data
    sub = obs$.subscribe((value): void => void (r.value = value));
  });

  onBeforeUnmount((): void => sub?.unsubscribe());

  return r;
}

// TODO DESKTOP: DEBUG CODE
// console.log('XXX1', vueTranslationService.translate('menu.start'));
// vueTranslationService.locale$.next(Locales.nl);
// setTimeout(() => {
//   console.log('XXX2', vueTranslationService.translate('menu.start'));
// }, 500);

setInterval(() => {
  vueTranslationService.locale$.next(vueTranslationService.locale$.value === Locales.nl ? Locales.en : Locales.nl);
}, 1500);

const translated = useText(t$('menu.start'));

// const asd: any;
// vueTranslationService.t$('menu.start').subscribe((v) => {
//   console.log('XXX', v);
// });

// console.log(i18n.translate('hud.fps', { count: '60' }));
// console.log(i18n.formatNumber(1234.56, { style: 'currency', currency: 'EUR' }));
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
    <div>{{ translated }}</div>
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
