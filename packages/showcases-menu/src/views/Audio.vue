<script setup lang="ts">
import Navigation from '@Menu/components/Navigation.vue';
import Range from '@Menu/components/Range.vue';
import SettingsGroup from '@Menu/components/SettingsGroup.vue';
import View from '@Menu/components/View.vue';
import ViewActions from '@Menu/components/ViewActions.vue';
import ViewForm from '@Menu/components/ViewForm.vue';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { TWriteable } from 'anarchy_engine/src';
import { reactive } from 'vue';

import type { TAudioSettings } from '@ShowcasesShared';

const emit = defineEmits(['reset', 'save']);

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
</script>

<template>
  <View class="audio" title="Audio">
    <ViewForm name="audio" class="audio__view-form" @submit="save(state)">
      <SettingsGroup title="Main audio settings">
        <Range v-model="state.masterVolume" :min="0" :max="100" class="audio__setting -masterVolume" label="Master Volume" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
