<script setup lang="ts">
import Checkbox from '@Menu/components/Checkbox.vue';
import Dropdown from '@Menu/components/Dropdown.vue';
import Navigation from '@Menu/components/Navigation.vue';
import SettingsGroup from '@Menu/components/SettingsGroup.vue';
import View from '@Menu/components/View.vue';
import ViewActions from '@Menu/components/ViewActions.vue';
import ViewForm from '@Menu/components/ViewForm.vue';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import type { TDropdownOption, TGraphicsSettings } from '@Showcases/Shared';
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
    <ViewForm name="graphics" class="graphics__view-form" @submit="save(state)">
      <SettingsGroup title="Main graphics settings">
        <Checkbox v-model="state.isFullScreen" class="graphics__setting -fullscreen" label="Fullscreen" />
        <Dropdown v-model="state.resolution" :options="options" class="graphics__setting -resolution" label="Resolution" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
