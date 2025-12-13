<script setup lang="ts">
import MenuSettingsGroup from '@Menu/components/MenuSettingsGroup.vue';
import MenuView from '@Menu/components/MenuView.vue';
import MenuViewActions from '@Menu/components/MenuViewActions.vue';
import SettingsRangeComponent from '@Menu/components/SettingsRangeComponent.vue';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
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
  <MenuView class="audio" title="Audio settings">
    <MenuSettingsGroup class="main-menu-view__group" title="Main Audio Settings">
      <SettingsRangeComponent v-model="state.masterVolume" :min="0" :max="100" class="main-menu-view__setting -masterVolume" label="Master Volume" />
    </MenuSettingsGroup>
    <MenuViewActions @cancel="cancel()" @save="save(state)" />
  </MenuView>
</template>

<style scoped></style>
