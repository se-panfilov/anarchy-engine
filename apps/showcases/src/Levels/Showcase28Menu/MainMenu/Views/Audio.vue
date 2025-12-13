<script setup lang="ts">
import { reactive } from 'vue';
import MenuViewActions from '@/Levels/Showcase28Menu/MainMenu/Components/MenuViewActions.vue';
import { useSettingsStore } from '@/Levels/Showcase28Menu/MainMenu/Stores/SettingsStore';
import type { TAudioSettings } from '@/Levels/Showcase28Menu/Models';
import type { TWriteable } from '@Engine';

const emit = defineEmits(['cancel', 'save']);

const settingsStore = useSettingsStore();

const state: TWriteable<TAudioSettings> = reactive({ masterVolume: settingsStore.audio.masterVolume });

function cancel() {
  state.masterVolume = settingsStore.audio.masterVolume;
  emit('cancel');
}

function save(payload: TAudioSettings) {
  settingsStore.audio = { ...payload };
  emit('save');
}
</script>

<template>
  <div class="audio main-menu-view">
    <div class="main-menu-view__title">Audio settings</div>
    <div class="main-menu-view__group">
      <div class="main-menu-view__group-title">Group 1</div>
      <label class="main-menu-view__setting -masterVolume">
        <span class="main-menu-view__setting-description">MasterVolume</span>
        <input type="range" min="0" max="100" v-model="state.masterVolume" class="main-menu-view__setting-value -range" />
        <span class="main-menu-view__setting-helper"> {{ state.masterVolume }}</span>
      </label>
    </div>
    <MenuViewActions @cancel="cancel()" @save="save(state)" />
  </div>
</template>

<style scoped></style>
