<script setup lang="ts">
import type { TWriteable } from '@Engine';
import Dropdown from '@Menu/components/Dropdown.vue';
import Navigation from '@Menu/components/Navigation.vue';
import SettingsGroup from '@Menu/components/SettingsGroup.vue';
import View from '@Menu/components/View.vue';
import ViewActions from '@Menu/components/ViewActions.vue';
import ViewForm from '@Menu/components/ViewForm.vue';
import { Languages } from '@Menu/constants';
import type { TDropdownOption } from '@Menu/models';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import type { TLocalizationSettings } from '@ShowcasesShared';
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
  <View class="localization" title="Localization">
    <ViewForm name="localization" class="localization__view-form" @submit="save(state)">
      <SettingsGroup title="Main localization settings">
        <Dropdown v-model="state.language" :options="options" class="localization__setting -resolution" label="Resolution" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
