<script setup lang="ts">
import type { TWriteable } from '@Engine';
import { computed, reactive } from 'vue';

import MenuSettingsGroup from '@/Levels/Showcase28Menu/MainMenu/Components/MenuSettingsGroup.vue';
import MenuView from '@/Levels/Showcase28Menu/MainMenu/Components/MenuView.vue';
import MenuViewActions from '@/Levels/Showcase28Menu/MainMenu/Components/MenuViewActions.vue';
import SettingsDropdownComponent from '@/Levels/Showcase28Menu/MainMenu/Components/SettingsDropdownComponent.vue';
import { Languages } from '@/Levels/Showcase28Menu/MainMenu/Constants';
import type { TDropdownOption } from '@/Levels/Showcase28Menu/MainMenu/Models';
import { useSettingsStore } from '@/Levels/Showcase28Menu/MainMenu/Stores/SettingsStore';
import type { TLocalizationSettings } from '@/Levels/Showcase28Menu/Models';

const emit = defineEmits(['cancel', 'save']);
const settingsStore = useSettingsStore();

const state: TWriteable<TLocalizationSettings> = reactive({
  language: settingsStore.localization.language
});

function cancel(): void {
  state.language = settingsStore.localization.language;
  emit('cancel');
}

function save(payload: TLocalizationSettings): void {
  // eslint-disable-next-line functional/immutable-data
  settingsStore.localization = { ...payload };
  emit('save');
}

const options = computed((): ReadonlyArray<TDropdownOption<Languages>> => {
  return Object.values(Languages).map((language) => ({ value: language, label: language }));
});
</script>

<template>
  <MenuView class="localization" title="Localization settings">
    <MenuSettingsGroup class="main-menu-view__group" title="Main Localization Settings">
      <SettingsDropdownComponent v-model="state.language" :options="options" class="main-menu-view__setting -resolution" label="Resolution" />
    </MenuSettingsGroup>
    <MenuViewActions @cancel="cancel()" @save="save(state)" />
  </MenuView>
</template>

<style scoped></style>
