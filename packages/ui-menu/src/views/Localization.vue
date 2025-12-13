<script setup lang="ts">
import type { TWriteable } from '@Engine';
import Dropdown from '@Menu/components/Dropdown.vue';
import SettingsGroup from '@Menu/components/SettingsGroup.vue';
import View from '@Menu/components/View.vue';
import ViewActions from '@Menu/components/ViewActions.vue';
import { Languages } from '@Menu/constants';
import type { TDropdownOption } from '@Menu/models';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { TLocalizationSettings } from '@Shared/Showcase';
import { computed, reactive } from 'vue';

const emit = defineEmits(['reset', 'save']);
const settingsStore = useSettingsStore();

const state: TWriteable<TLocalizationSettings> = reactive({
  language: settingsStore.localization.language
});

function reset(): void {
  state.language = settingsStore.localization.language;
  emit('reset');
}

function save(payload: TLocalizationSettings): void {
  settingsStore.setLocalization(payload);
  emit('save');
}

const options = computed((): ReadonlyArray<TDropdownOption<Languages>> => {
  return Object.values(Languages).map((language) => ({ value: language, label: language }));
});
</script>

<template>
  <View class="localization" title="Localization settings">
    <SettingsGroup class="main-menu-view__group" title="Main Localization Settings">
      <Dropdown v-model="state.language" :options="options" class="main-menu-view__setting -resolution" label="Resolution" />
    </SettingsGroup>
    <ViewActions @reset="reset()" @save="save(state)" />
  </View>
</template>

<style scoped></style>
