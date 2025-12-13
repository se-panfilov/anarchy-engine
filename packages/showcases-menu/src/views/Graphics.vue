<script setup lang="ts">
import type { TWriteable } from '@Anarchy/Shared/Utils';
import Checkbox from '@Showcases/Menu/components/Checkbox.vue';
import Dropdown from '@Showcases/Menu/components/Dropdown.vue';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewActions from '@Showcases/Menu/components/ViewActions.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { vueTranslationService } from '@Showcases/Menu/services';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TDropdownOption, TGraphicsSettings } from '@Showcases/Shared';
import type { ShallowRef } from 'vue';
import { computed, reactive } from 'vue';

const emit = defineEmits(['reset', 'save']);

const { $t } = vueTranslationService;
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

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.graphics.view.title');
const mainSettingsGroupTitleText: ShallowRef<string> = $t('main-menu.settings.graphics.group.main-graphics-settings.title');
const fullscreenLabelText: ShallowRef<string> = $t('main-menu.settings.graphics.is-fullscreen.label');
const resolutionLabelText: ShallowRef<string> = $t('main-menu.settings.graphics.resolution.label');
</script>

<template>
  <View class="graphics" :title="viewTitleText">
    <ViewForm name="graphics" class="graphics__view-form" @submit="save(state)">
      <SettingsGroup :title="mainSettingsGroupTitleText">
        <Checkbox v-model="state.isFullScreen" class="graphics__setting -fullscreen" :label="fullscreenLabelText" />
        <Dropdown v-model="state.resolution" :options="options" class="graphics__setting -resolution" :label="resolutionLabelText" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
