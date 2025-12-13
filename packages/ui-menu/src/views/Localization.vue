<script setup lang="ts">
import type { TWriteable } from '@Engine';
import MenuSettingsGroup from '@Menu/components/MenuSettingsGroup.vue';
import MenuView from '@Menu/components/MenuView.vue';
import MenuViewActions from '@Menu/components/MenuViewActions.vue';
import SettingsDropdownComponent from '@Menu/components/SettingsDropdownComponent.vue';
import { Languages } from '@Menu/constants';
import type { TDropdownOption } from '@Menu/models';
import { useSettingsStore } from '@Menu/stores/SettingsStore';
import { computed, reactive } from 'vue';

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
