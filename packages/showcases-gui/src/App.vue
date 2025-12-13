<script setup lang="ts">
import './assets/style.scss';

import { eventsService } from '@Showcases/GUI/services';
import Home from '@Showcases/GUI/views/Home.vue';
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
    <!--    <RouterView class="gui__item -view" @save="some" />-->
    <Home class="gui__item -home" />
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
