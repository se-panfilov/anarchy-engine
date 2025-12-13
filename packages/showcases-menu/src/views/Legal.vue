<script setup lang="ts">
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { vueTranslationService } from '@Showcases/Menu/services';
import type { ShallowRef } from 'vue';

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

const { $t } = vueTranslationService;

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.legal.view.title');
const mainSettingsGroupTitleText: ShallowRef<string> = $t('main-menu.settings.legal.group.main-legal-settings.title');
</script>

<template>
  <View class="legal" :title="viewTitleText">
    <ViewForm name="legal" class="legal__view-form">
      <SettingsGroup :title="mainSettingsGroupTitleText"> 123 </SettingsGroup>
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>
