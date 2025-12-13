<script setup lang="ts">
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { vueTranslationService } from '@Showcases/Menu/services';
import type { ShallowRef } from 'vue';

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
