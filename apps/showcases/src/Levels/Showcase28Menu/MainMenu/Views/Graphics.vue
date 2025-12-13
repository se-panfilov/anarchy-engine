<script setup lang="ts">
import MenuViewActions from '@/Levels/Showcase28Menu/MainMenu/Components/MenuViewActions.vue';
import MenuSettingsGroup from '@/Levels/Showcase28Menu/MainMenu/Components/MenuSettingsGroup.vue';
import MenuView from '@/Levels/Showcase28Menu/MainMenu/Components/MenuView.vue';
import SettingsCheckboxComponent from '@/Levels/Showcase28Menu/MainMenu/Components/SettingsCheckboxComponent.vue';
import SettingsDropdownComponent from '@/Levels/Showcase28Menu/MainMenu/Components/SettingsDropdownComponent.vue';
import { computed, reactive } from 'vue';
import { useSettingsStore } from '@/Levels/Showcase28Menu/MainMenu/Stores/SettingsStore';
import { TGraphicsSettings, TResolution } from '@/Levels/Showcase28Menu/Models';
import type { TWriteable } from '@Engine';

const emit = defineEmits(['cancel', 'save']);

const settingsStore = useSettingsStore();

const state: TWriteable<TGraphicsSettings> = reactive({
  isFullScreen: settingsStore.graphics.isFullScreen,
  resolution: settingsStore.graphics.resolution
});

function cancel() {
  state.isFullScreen = settingsStore.graphics.isFullScreen;
  state.resolution = settingsStore.graphics.resolution;

  emit('cancel');
}

function save(payload: TGraphicsSettings) {
  settingsStore.graphics = { ...payload };
  emit('save');
}

const options = computed(() => {
  return settingsStore.getAvailableResolutions().map((resolution) => ({
    value: resolution,
    label: `${resolution.width}x${resolution.height}`
  }));
});
</script>

<template>
  <MenuView class="graphics" title="Graphics settings">
    <MenuSettingsGroup class="main-menu-view__group" title="Main Graphics Settings">
      <SettingsCheckboxComponent :value="state.isFullScreen" class="main-menu-view__setting -fullscreen" label="Fullscreen" @change="(value: boolean) => (state.isFullScreen = value)" />
      <SettingsDropdownComponent
        :options="options"
        :value="state.resolution"
        class="main-menu-view__setting -resolution"
        label="Resolution"
        @change="(value: Readonly<TResolution>) => (state.resolution = value)"
      />
    </MenuSettingsGroup>
    <MenuViewActions @cancel="cancel()" @save="save(state)" />
  </MenuView>
</template>

<style scoped></style>
