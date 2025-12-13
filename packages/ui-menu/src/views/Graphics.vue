<script setup lang="ts">
import type { TWriteable } from '@Engine';
import MenuSettingsGroup from '@Menu/components/MenuSettingsGroup.vue';
import MenuView from '@Menu/components/MenuView.vue';
import MenuViewActions from '@Menu/components/MenuViewActions.vue';
import SettingsCheckboxComponent from '@Menu/components/SettingsCheckboxComponent.vue';
import SettingsDropdownComponent from '@Menu/components/SettingsDropdownComponent.vue';
import type { TDropdownOption } from '@Menu/models';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
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
  <MenuView class="graphics" title="Graphics settings">
    <MenuSettingsGroup class="main-menu-view__group" title="Main Graphics Settings">
      <SettingsCheckboxComponent v-model="state.isFullScreen" class="main-menu-view__setting -fullscreen" label="Fullscreen" />
      <SettingsDropdownComponent v-model="state.resolution" :options="options" class="main-menu-view__setting -resolution" label="Resolution" />
    </MenuSettingsGroup>
    <MenuViewActions @cancel="cancel()" @save="save(state)" />
  </MenuView>
</template>

<style scoped></style>
