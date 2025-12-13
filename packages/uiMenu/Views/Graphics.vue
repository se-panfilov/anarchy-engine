<script setup lang="ts">
import type { TWriteable } from 'anarchy_engine/src';
import { computed, reactive } from 'vue';

import MenuSettingsGroup from 'packages/MainMenu/Components/MenuSettingsGroup.vue';
import MenuView from 'packages/MainMenu/Components/MenuView.vue';
import MenuViewActions from 'packages/MainMenu/Components/MenuViewActions.vue';
import SettingsCheckboxComponent from 'packages/MainMenu/Components/SettingsCheckboxComponent.vue';
import SettingsDropdownComponent from 'packages/MainMenu/Components/SettingsDropdownComponent.vue';
import type { TDropdownOption } from 'packages/MainMenu/Models';
import { useSettingsStore } from 'packages/MainMenu/Stores/SettingsStore';
import type { TGraphicsSettings } from 'anarchy_engine_showcases/src/Levels/Showcase28Menu/Models';

const emit = defineEmits(['cancel', 'save']);

const settingsStore = useSettingsStore();

const state: TWriteable<TGraphicsSettings> = reactive({
  isFullScreen: settingsStore.graphics.isFullScreen,
  resolution: settingsStore.graphics.resolution
});

function cancel(): void {
  state.isFullScreen = settingsStore.graphics.isFullScreen;
  state.resolution = settingsStore.graphics.resolution;

  emit('cancel');
}

function save(payload: TGraphicsSettings): void {
  // eslint-disable-next-line functional/immutable-data
  settingsStore.graphics = { ...payload };
  emit('save');
}

const options = computed((): ReadonlyArray<TDropdownOption<{ width: number; height: number }>> => {
  return settingsStore.getAvailableResolutions().map((resolution) => ({
    value: resolution,
    label: `${resolution.width}x${resolution.height}`
  }));
});
</script>

<template>
  <MenuView class="graphics" title="Graphics settings">
    <MenuSettingsGroup class="main-menu-view__group" title="Main Graphics Settings">
      <SettingsCheckboxComponent v-model="state.isFullScreen" class="main-menu-view__setting -fullscreen" label="Fullscreen" />
      <SettingsDropdownComponent v-model="state.resolution" :options="options" class="main-menu-view__setting -resolution" label="Resolution" />
    </MenuSettingsGroup>
    <MenuViewActions @cancel="cancel()" @save="save(state)" />
  </MenuView>
</template>

<style scoped></style>
