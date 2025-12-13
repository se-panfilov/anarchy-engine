<script setup lang="ts">
import './assets/style.scss';

import { vueTranslationService } from '@Showcases/i18n';
import RouterView from '@Showcases/Menu/components/RouterView.vue';
import { eventsEmitterService, eventsListenerService } from '@Showcases/Menu/services';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted } from 'vue';

let appEventsSub$: Subscription | undefined;

onMounted((): void => {
  appEventsSub$ = eventsListenerService.startListeningAppEvents();
  eventsEmitterService.emitGetMenuSettings();
});

onUnmounted((): void => {
  vueTranslationService.destroy$.next();
  appEventsSub$?.unsubscribe();
});

function save(): void {
  eventsEmitterService.emitSetMenuSettings(useSettingsStore().state);
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
