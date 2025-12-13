<script setup lang="ts">
import './assets/style.scss';

import RouterView from '@Showcases/GUI/components/RouterView.vue';
import { eventsService } from '@Showcases/GUI/services';
import { useSettingsStore } from '@Showcases/GUI/stores/SettingsStore';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted } from 'vue';

let appEventsSub$: Subscription | undefined;

onMounted((): void => {
  appEventsSub$ = eventsService.startListeningAppEvents();
  eventsService.emitGetGuiSettings();
});

onUnmounted((): void => appEventsSub$?.unsubscribe());

function save(): void {
  eventsService.emitSetGuiSettings(useSettingsStore().state);
}
</script>

<template>
  <div class="gui">
    <RouterView class="gui__item -view" @save="save" />
  </div>
</template>

<style scoped lang="scss">
.gui {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
}
</style>
