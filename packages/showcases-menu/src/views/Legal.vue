<script setup lang="ts">
import { isNotDefined } from '@Anarchy/Shared/Utils';
import MdRenderer from '@Showcases/Menu/components/MdRenderer.vue';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { eventsService, vueTranslationService } from '@Showcases/Menu/services';
import { useLegalDocsStore } from '@Showcases/Menu/stores/LegalDocsStore';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TShowcaseLocaleIds } from '@Showcases/Shared';
import { AllowedLegalDocNames } from '@Showcases/Shared';
import type { ShallowRef } from 'vue';
import { onMounted } from 'vue';

const { DISCLAIMER, EULA, NOTICE, SUPPORT, PRIVACY, SECURITY, INSTRUCTIONS, THIRD_PARTY_LICENSES } = AllowedLegalDocNames;
const legalDocsStore = useLegalDocsStore();
const settingsStore = useSettingsStore();

// TODO DESKTOP: LEGAL: change legal folders to /legal/{locale} (also public/legal/{locale}, assets/legal/{locale})
// TODO DESKTOP: LEGAL: legalDocsStore.state.XXXX should also be distinct by locales
onMounted(() => {
  const locale = settingsStore.localization.locale.id as TShowcaseLocaleIds;

  if (isNotDefined(legalDocsStore.state.EULA)) eventsService.emitLoadLegalDocs({ name: EULA, locale });
  if (isNotDefined(legalDocsStore.state.NOTICE)) eventsService.emitLoadLegalDocs({ name: NOTICE, locale });
  if (isNotDefined(legalDocsStore.state.DISCLAIMER)) eventsService.emitLoadLegalDocs({ name: DISCLAIMER, locale });
  if (isNotDefined(legalDocsStore.state.PRIVACY)) eventsService.emitLoadLegalDocs({ name: PRIVACY, locale });
  if (isNotDefined(legalDocsStore.state.SUPPORT)) eventsService.emitLoadLegalDocs({ name: SUPPORT, locale });
  if (isNotDefined(legalDocsStore.state.SECURITY)) eventsService.emitLoadLegalDocs({ name: SECURITY, locale });
  if (isNotDefined(legalDocsStore.state.INSTRUCTIONS)) eventsService.emitLoadLegalDocs({ name: INSTRUCTIONS, locale });
  if (isNotDefined(legalDocsStore.state.THIRD_PARTY_LICENSES)) eventsService.emitLoadLegalDocs({ name: THIRD_PARTY_LICENSES, locale });
});

const { $t } = vueTranslationService;

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.legal.view.title');
</script>

<template>
  <View class="legal" :title="viewTitleText">
    <ViewForm name="legal" class="legal__view-form">
      <MdRenderer class="legal__renderer -EULA" :content="legalDocsStore.state.EULA" />
      <MdRenderer class="legal__renderer -NOTICE" :content="legalDocsStore.state.NOTICE" />
      <MdRenderer class="legal__renderer -DISCLAIMER" :content="legalDocsStore.state.DISCLAIMER" />
      <MdRenderer class="legal__renderer -PRIVACY" :content="legalDocsStore.state.PRIVACY" />
      <MdRenderer class="legal__renderer -SUPPORT" :content="legalDocsStore.state.SUPPORT" />
      <MdRenderer class="legal__renderer -SECURITY" :content="legalDocsStore.state.SECURITY" />
      <MdRenderer class="legal__renderer -INSTRUCTIONS" :content="legalDocsStore.state.INSTRUCTIONS" />
      <MdRenderer class="legal__renderer -THIRD_PARTY_LICENSES" :content="legalDocsStore.state.THIRD_PARTY_LICENSES" />
      <Navigation class="settings__navigation" :back-btn="true" />
    </ViewForm>
  </View>
</template>

<style lang="scss">
.legal {
  max-width: min(900px, 90vw);

  &__renderer {
    max-height: 80vh;
    overflow-y: auto;
    background: white;
    padding: 20px 40px;
    border-radius: 3px;
    border: 1px solid rgb(0 0 0 / 30%);
  }
}
</style>
