<script setup lang="ts">
import type { TLocale } from '@Anarchy/i18n';
import type { TShowcaseLocaleIds } from '@Showcases/i18n';
import { ShowcasesLocales } from '@Showcases/i18n';
import Dropdown from '@Showcases/Menu/components/Dropdown.vue';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewActions from '@Showcases/Menu/components/ViewActions.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { vueTranslationService } from '@Showcases/Menu/services';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TDropdownOption } from '@Showcases/Shared';
import type { ComputedRef, ShallowRef } from 'vue';
import { computed, reactive } from 'vue';

const emit = defineEmits(['reset', 'save']);

const { $t } = vueTranslationService;
const settingsStore = useSettingsStore();

type TLocalizationState = { locale: TShowcaseLocaleIds };
const state: TLocalizationState = reactive({
  locale: settingsStore.localization.locale.id as TShowcaseLocaleIds
});

function reset(): void {
  state.locale = settingsStore.localization.locale.id as TShowcaseLocaleIds;
  emit('reset');
}

function save({ locale }: TLocalizationState): void {
  settingsStore.setLocaleById(locale);
  emit('save');
}

const options: ComputedRef<ReadonlyArray<TDropdownOption<TShowcaseLocaleIds>>> = computed((): ReadonlyArray<TDropdownOption<TShowcaseLocaleIds>> => {
  return Object.values(ShowcasesLocales).map((locale: TLocale) => ({ value: locale.id as TShowcaseLocaleIds, label: locale.nativeName }));
});

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.localization.view.title');
const mainSettingsGroupTitleText: ShallowRef<string> = $t('main-menu.settings.localization.group.main-localization-settings.title');
const languageLabelText: ShallowRef<string> = $t('main-menu.settings.localization.language.label');
</script>

<template>
  <View class="localization" :title="viewTitleText">
    <ViewForm name="localization" class="localization__view-form" @submit="save(state)">
      <SettingsGroup :title="mainSettingsGroupTitleText">
        <Dropdown v-model="state.locale" :options="options" class="localization__setting -languages" :label="languageLabelText" />
      </SettingsGroup>
      <ViewActions @reset="reset()" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
