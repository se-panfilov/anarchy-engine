<script setup lang="ts">
import { TLocalizationSettings } from '@/Levels/Showcase28Menu/Models';
import SettingsDropdownComponent from '@/Levels/Showcase28Menu/MainMenu/Components/SettingsDropdownComponent.vue';
import MenuViewActions from '@/Levels/Showcase28Menu/MainMenu/Components/MenuViewActions.vue';
import MenuSettingsGroup from '@/Levels/Showcase28Menu/MainMenu/Components/MenuSettingsGroup.vue';
import MenuView from '@/Levels/Showcase28Menu/MainMenu/Components/MenuView.vue';
import { useSettingsStore } from '@/Levels/Showcase28Menu/MainMenu/Stores/SettingsStore';
import type { TWriteable } from '@Engine';
import { computed, reactive } from 'vue';
import { Languages } from '@/Levels/Showcase28Menu/MainMenu/Constants';

const emit = defineEmits(['cancel', 'save']);
const settingsStore = useSettingsStore();

const state: TWriteable<TLocalizationSettings> = reactive({
  language: settingsStore.localization.language
});

function cancel() {
  state.language = settingsStore.localization.language;
  emit('cancel');
}

function save(payload: TLocalizationSettings) {
  settingsStore.localization = { ...payload };
  emit('save');
}

const options = computed(() => {
  return Object.values(Languages).map((language) => ({ value: language, label: language }));
});
</script>

<template>
  <MenuView class="localization" title="Localization settings">
    <MenuSettingsGroup class="main-menu-view__group" title="Main Localization Settings">
      <SettingsDropdownComponent
        :options="options"
        :value="state.language"
        class="main-menu-view__setting -resolution"
        label="Resolution"
        @change="(value: Readonly<Languages>) => (state.language = value)"
      />
    </MenuSettingsGroup>
    <MenuViewActions @cancel="cancel()" @save="save(state)" />
  </MenuView>
</template>

<style scoped></style>
