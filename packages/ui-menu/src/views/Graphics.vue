<script setup lang="ts">
import type { TWriteable } from '@Engine';
import Checkbox from '@Menu/components/Checkbox.vue';
import Dropdown from '@Menu/components/Dropdown.vue';
import Navigation from '@Menu/components/Navigation.vue';
import SettingsGroup from '@Menu/components/SettingsGroup.vue';
import View from '@Menu/components/View.vue';
import ViewActions from '@Menu/components/ViewActions.vue';
import type { TDropdownOption } from '@Menu/models';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { TGraphicsSettings } from '@Shared/Showcase';
import { computed, reactive } from 'vue';

const emit = defineEmits(['reset', 'save']);

const settingsStore = useSettingsStore();

const state: TWriteable<TGraphicsSettings> = reactive({
  isFullScreen: settingsStore.graphics.isFullScreen,
  resolution: settingsStore.graphics.resolution
});

function reset(): void {
  state.isFullScreen = settingsStore.graphics.isFullScreen;
  state.resolution = settingsStore.graphics.resolution;

  emit('reset');
}

function save(payload: TGraphicsSettings): void {
  settingsStore.setGraphics(payload);
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
  <View class="graphics" title="Graphics">
    <form name="audio" @submit.prevent="save(state)">
      <SettingsGroup class="main-menu-view__group" title="Main Graphics Settings">
        <Checkbox v-model="state.isFullScreen" class="main-menu-view__setting -fullscreen" label="Fullscreen" />
        <Dropdown v-model="state.resolution" :options="options" class="main-menu-view__setting -resolution" label="Resolution" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </form>
  </View>
</template>

<style scoped></style>
