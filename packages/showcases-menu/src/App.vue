<script setup lang="ts">
import './assets/style.scss';

import RouterView from '@Showcases/Menu/components/RouterView.vue';
import { eventsService } from '@Showcases/Menu/services';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted } from 'vue';

let appEventsSub$: Subscription | undefined;

// TODO DESKTOP: Localization should be applied in the UI (not only in the threejs and menu)
// TODO DESKTOP: Fix unit tests for Menu package

onMounted((): void => {
  appEventsSub$ = eventsService.startListeningAppEvents();
  eventsService.emitGetMenuSettings();
});

onUnmounted((): void => appEventsSub$?.unsubscribe());

function save(): void {
  eventsService.emitSetMenuSettings(useSettingsStore().state);
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
