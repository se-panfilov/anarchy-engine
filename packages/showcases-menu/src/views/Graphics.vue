<script setup lang="ts">
import type { TWriteable } from '@Anarchy/Shared/Utils';
import Checkbox from '@Showcases/Menu/components/Checkbox.vue';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewActions from '@Showcases/Menu/components/ViewActions.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TGraphicsSettings } from '@Showcases/Shared';
import { reactive } from 'vue';

const emit = defineEmits(['reset', 'save']);

const settingsStore = useSettingsStore();

const state: TWriteable<TGraphicsSettings> = reactive({
  isFullScreen: settingsStore.graphics.isFullScreen,
  brightness: settingsStore.graphics.brightness,
  contrast: settingsStore.graphics.contrast
});

function reset(): void {
  state.isFullScreen = settingsStore.graphics.isFullScreen;

  emit('reset');
}

function save(payload: TGraphicsSettings): void {
  settingsStore.setGraphics(payload);
  emit('save');
}
</script>

<template>
  <View class="graphics" :title="$t('main-menu.settings.graphics.view.title')">
    <ViewForm name="graphics" class="graphics__view-form" @submit="save(state)">
      <SettingsGroup :title="$t('main-menu.settings.graphics.group.main-graphics-settings.title')">
        <Checkbox v-model="state.isFullScreen" class="graphics__setting -fullscreen" :label="$t('main-menu.settings.graphics.is-fullscreen.label')" />
        <!--        <Dropdown v-model="state.resolution" :options="options" class="graphics__setting -resolution" :label="resolutionLabelText" />-->
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
