<script setup lang="ts">
import Range from '@Menu/components/Range.vue';
import SettingsGroup from '@Menu/components/SettingsGroup.vue';
import View from '@Menu/components/View.vue';
import ViewActions from '@Menu/components/ViewActions.vue';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { TAudioSettings } from '@Shared/Showcase';
import type { TWriteable } from 'anarchy_engine/src';
import { reactive } from 'vue';

const emit = defineEmits(['cancel', 'save']);

const settingsStore = useSettingsStore();

const state: TWriteable<TAudioSettings> = reactive({ masterVolume: settingsStore.audio.masterVolume });

function cancel(): void {
  state.masterVolume = settingsStore.audio.masterVolume;
  emit('cancel');
}

function save(payload: TAudioSettings): void {
  // eslint-disable-next-line functional/immutable-data
  settingsStore.audio = { ...payload };
  emit('save');
}
</script>

<template>
  <View class="audio" title="Audio settings">
    <SettingsGroup class="main-menu-view__group" title="Main Audio Settings">
      <Range v-model="state.masterVolume" :min="0" :max="100" class="main-menu-view__setting -masterVolume" label="Master Volume" />
    </SettingsGroup>
    <ViewActions @cancel="cancel()" @save="save(state)" />
  </View>
</template>

<style scoped></style>
