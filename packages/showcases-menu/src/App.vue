<script setup lang="ts">
import './assets/style.scss';

import RouterView from '@Menu/components/RouterView.vue';
import { eventsService } from '@Menu/services';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted } from 'vue';

let appEventsSub$: Subscription | undefined;

onMounted((): void => {
  appEventsSub$ = eventsService.startListeningAppEvents();
  eventsService.emitLoadMenuSettings();
});

onUnmounted(() => appEventsSub$?.unsubscribe());

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
