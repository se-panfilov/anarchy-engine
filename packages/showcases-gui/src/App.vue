<script setup lang="ts">
import './assets/style.scss';

import { eventsService } from '@Showcases/GUI/services';
import Bottom from '@Showcases/GUI/views/Bottom.vue';
import type { TInputShieldService } from '@Showcases/Shared';
import { InputShieldService } from '@Showcases/Shared';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted, ref } from 'vue';

let appEventsSub$: Subscription | undefined;

const root = ref<HTMLElement | null>(null);
const inputShieldService: TInputShieldService = InputShieldService(() => root.value);

onMounted((): void => {
  appEventsSub$ = eventsService.startListeningAppEvents();
  // eventsService.emitGetCurrentGui();
  inputShieldService.start();
});

onUnmounted((): void => {
  appEventsSub$?.unsubscribe();
  inputShieldService.start();
});

// function some(): void {
// eventsService.emitSetGuiSettings(useSettingsStore().state);
// }
</script>

<template>
  <div ref="root" class="gui">
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
