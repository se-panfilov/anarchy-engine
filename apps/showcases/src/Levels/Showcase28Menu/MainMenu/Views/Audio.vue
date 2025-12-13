<script setup lang="ts">
import type { TWriteable } from '@Engine';
import { reactive } from 'vue';

import MenuSettingsGroup from '@/Levels/Showcase28Menu/MainMenu/Components/MenuSettingsGroup.vue';
import MenuView from '@/Levels/Showcase28Menu/MainMenu/Components/MenuView.vue';
import MenuViewActions from '@/Levels/Showcase28Menu/MainMenu/Components/MenuViewActions.vue';
import SettingsRangeComponent from '@/Levels/Showcase28Menu/MainMenu/Components/SettingsRangeComponent.vue';
import { useSettingsStore } from '@/Levels/Showcase28Menu/MainMenu/Stores/SettingsStore';
import type { TAudioSettings } from '@/Levels/Showcase28Menu/Models';

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
