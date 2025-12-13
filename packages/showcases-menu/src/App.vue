<script setup lang="ts">
import './assets/style.scss';

import RouterView from '@Showcases/Menu/components/RouterView.vue';
import { eventsService, vueTranslationService } from '@Showcases/Menu/services';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import { ShowcasesLocales } from '@Showcases/Shared';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted } from 'vue';

let appEventsSub$: Subscription | undefined;

const { $t } = vueTranslationService;

// TODO DESKTOP: DEBUG CODE
setInterval(() => {
  vueTranslationService.locale$.next(vueTranslationService.locale$.value === ShowcasesLocales['nl-NL'] ? ShowcasesLocales['en-US'] : ShowcasesLocales['nl-NL']);
}, 1500);

const translated = $t('menu.start');
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
