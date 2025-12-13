<script setup lang="ts">
import type { TWriteable } from '@Anarchy/Shared/Utils';
import Dropdown from '@Showcases/Menu/components/Dropdown.vue';
import Navigation from '@Showcases/Menu/components/Navigation.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewActions from '@Showcases/Menu/components/ViewActions.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { Languages } from '@Showcases/Menu/constants';
import { vueTranslationService } from '@Showcases/Menu/services';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TDropdownOption, TLocalizationSettings } from '@Showcases/Shared';
import type { ShallowRef } from 'vue';
import { computed, reactive } from 'vue';

const emit = defineEmits(['reset', 'save']);

const { $t } = vueTranslationService;
const settingsStore = useSettingsStore();

const state: TWriteable<TLocalizationSettings> = reactive({
  language: settingsStore.localization.language
});

function reset(): void {
  // TODO DESKTOP: select languages from available languages!!!!!!
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

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.localization.view.title');
const mainSettingsGroupTitleText: ShallowRef<string> = $t('main-menu.settings.localization.group.main-localization-settings.title');
const languageLabelText: ShallowRef<string> = $t('main-menu.settings.localization.language.label');
</script>

<template>
  <View class="localization" :title="viewTitleText">
    <ViewForm name="localization" class="localization__view-form" @submit="save(state)">
      <SettingsGroup :title="mainSettingsGroupTitleText">
        <Dropdown v-model="state.language" :options="options" class="localization__setting -languages" :label="languageLabelText" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
