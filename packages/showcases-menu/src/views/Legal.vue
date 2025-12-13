<script setup lang="ts">
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { eventsService, vueTranslationService } from '@Showcases/Menu/services';
import { useLegalDocsStore } from '@Showcases/Menu/stores/LegalDocsStore';
import { AllowedLegalDocNames } from '@Showcases/Shared';
import type { ShallowRef } from 'vue';
import { onMounted } from 'vue';

// TODO DESKTOP: LEGAL: Display legal info (based on platform) in the menu.
// The Plan:
//
// During legal files generation:
// - In showcases-core app copy ./legal into ./public/legal
// - In showcases-desktop app copy ./legal into ./assets/legal
//
// Via platform service provide the possibility to lazy-load the docs (params: "name", "lang")
// Add possibility to menu to receive that lazy-loaded content
// Render .md files in a scrollable view

onMounted(() => {
  eventsService.emitLoadLegalDocs({ name: AllowedLegalDocNames.EULA, locale: 'en-US' });
});

const { $t } = vueTranslationService;

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.legal.view.title');
const mainSettingsGroupTitleText: ShallowRef<string> = $t('main-menu.settings.legal.group.main-legal-settings.title');
</script>

<template>
  <View class="legal" :title="viewTitleText">
    <ViewForm name="legal" class="legal__view-form">
      <SettingsGroup :title="mainSettingsGroupTitleText"> {{ useLegalDocsStore().state.EULA }} </SettingsGroup>
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
