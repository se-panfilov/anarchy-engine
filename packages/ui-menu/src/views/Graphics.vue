<script setup lang="ts">
import type { TWriteable } from '@Engine';
import Checkbox from '@Menu/components/Checkbox.vue';
import Dropdown from '@Menu/components/Dropdown.vue';
import SettingsGroup from '@Menu/components/SettingsGroup.vue';
import View from '@Menu/components/View.vue';
import ViewActions from '@Menu/components/ViewActions.vue';
import type { TDropdownOption } from '@Menu/models';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { TGraphicsSettings } from '@Shared/Showcase';
import { computed, reactive } from 'vue';

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
  <View class="graphics" title="Graphics settings">
    <SettingsGroup class="main-menu-view__group" title="Main Graphics Settings">
      <Checkbox v-model="state.isFullScreen" class="main-menu-view__setting -fullscreen" label="Fullscreen" />
      <Dropdown v-model="state.resolution" :options="options" class="main-menu-view__setting -resolution" label="Resolution" />
    </SettingsGroup>
    <ViewActions @cancel="cancel()" @save="save(state)" />
  </View>
</template>

<style scoped></style>
