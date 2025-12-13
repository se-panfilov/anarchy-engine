<script setup lang="ts">
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { vueTranslationService } from '@Showcases/i18n';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import Range from '@Showcases/Menu/components/Range.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewActions from '@Showcases/Menu/components/ViewActions.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TAudioSettings } from '@Showcases/Shared';
import type { ShallowRef } from 'vue';
import { reactive } from 'vue';

const emit = defineEmits(['reset', 'save']);

const { $t } = vueTranslationService;
const settingsStore = useSettingsStore();

const state: TWriteable<TAudioSettings> = reactive({ masterVolume: settingsStore.audio.masterVolume });

function reset(): void {
  state.masterVolume = settingsStore.audio.masterVolume;
  emit('reset');
}

function save(payload: TAudioSettings): void {
  settingsStore.setAudio(payload);
  emit('save');
}

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.audio.view.title');
const mainSettingsGroupTitleText: ShallowRef<string> = $t('main-menu.settings.audio.group.main-audio-settings.title');
const labelText: ShallowRef<string> = $t('main-menu.settings.audio.master-volume.label');
</script>

<template>
  <View class="audio" :title="viewTitleText">
    <ViewForm name="audio" class="audio__view-form" @submit="save(state)">
      <SettingsGroup :title="mainSettingsGroupTitleText">
        <Range v-model="state.masterVolume" :min="0" :max="100" class="audio__setting -masterVolume" :label="labelText" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
