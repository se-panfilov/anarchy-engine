<script setup lang="ts">
import './assets/style.scss';

import { eventsService } from '@Showcases/GUI/services';
import Bottom from '@Showcases/GUI/views/Bottom.vue';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted } from 'vue';

let appEventsSub$: Subscription | undefined;

onMounted((): void => {
  appEventsSub$ = eventsService.startListeningAppEvents();
  // eventsService.emitGetCurrentGui();
});

onUnmounted((): void => appEventsSub$?.unsubscribe());

// function some(): void {
// eventsService.emitSetGuiSettings(useSettingsStore().state);
// }
</script>

<template>
  <div class="gui">
    <Bottom class="gui__item -bottom" />
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
