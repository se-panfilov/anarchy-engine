<script setup lang="ts">
import './assets/style.scss';

import RouterView from '@Showcases/Menu/components/RouterView.vue';
import { eventsService } from '@Showcases/Menu/services';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TInputShieldService } from '@Showcases/Shared';
import { InputShieldService } from '@Showcases/Shared';
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted, ref } from 'vue';

let appEventsSub$: Subscription | undefined;

const root = ref<HTMLElement | null>(null);
const inputShieldService: TInputShieldService = InputShieldService(() => root.value);

onMounted((): void => {
  appEventsSub$ = eventsService.startListeningAppEvents();
  eventsService.emitGetMenuSettings();
  inputShieldService.start();
});

onUnmounted((): void => {
  appEventsSub$?.unsubscribe();
  inputShieldService.start();
});

function save(): void {
  eventsService.emitSetMenuSettings(useSettingsStore().state);
}
</script>

<template>
  <div ref="root" class="main-menu">
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
