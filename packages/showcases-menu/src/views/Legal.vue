<script setup lang="ts">
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TShowcaseLocaleIds } from '@Showcases/i18n';
import MdRenderer from '@Showcases/Menu/components/MdRenderer.vue';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { eventsEmitterService } from '@Showcases/Menu/services';
import { useLegalDocsStore } from '@Showcases/Menu/stores/LegalDocsStore';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import { AllowedLegalDocNames } from '@Showcases/Shared';
import { onMounted } from 'vue';

const { DISCLAIMER, EULA, NOTICE, SUPPORT, PRIVACY, SECURITY, THIRD_PARTY_LICENSES } = AllowedLegalDocNames;
const legalDocsStore = useLegalDocsStore();
const settingsStore = useSettingsStore();

// TODO LEGAL: change legal folders to /legal/{locale} (also public/legal/{locale}, assets/legal/{locale})
onMounted(() => {
  const locale = settingsStore.localization.locale.id as TShowcaseLocaleIds;

  if (isNotDefined(legalDocsStore.translatedDisclaimer)) eventsEmitterService.emitGetLegalDocs({ name: DISCLAIMER, locale });
  if (isNotDefined(legalDocsStore.translatedEula)) eventsEmitterService.emitGetLegalDocs({ name: EULA, locale });
  if (isNotDefined(legalDocsStore.translatedPrivacy)) eventsEmitterService.emitGetLegalDocs({ name: PRIVACY, locale });
  if (isNotDefined(legalDocsStore.translatedNotice)) eventsEmitterService.emitGetLegalDocs({ name: NOTICE, locale });
  if (isNotDefined(legalDocsStore.translatedSupport)) eventsEmitterService.emitGetLegalDocs({ name: SUPPORT, locale });
  if (isNotDefined(legalDocsStore.translatedSecurity)) eventsEmitterService.emitGetLegalDocs({ name: SECURITY, locale });
  if (isNotDefined(legalDocsStore.translatedThirdPartyLicenses)) eventsEmitterService.emitGetLegalDocs({ name: THIRD_PARTY_LICENSES, locale });
});
</script>

<template>
  <View class="legal" :title="$t('main-menu.settings.legal.view.title')">
    <ViewForm name="legal" class="legal__view-form">
      <MdRenderer class="legal__renderer -DISCLAIMER" :content="legalDocsStore.translatedDisclaimer" />
      <MdRenderer class="legal__renderer -EULA" :content="legalDocsStore.translatedEula" />
      <MdRenderer class="legal__renderer -PRIVACY" :content="legalDocsStore.translatedPrivacy" />
      <MdRenderer class="legal__renderer -NOTICE" :content="legalDocsStore.translatedNotice" />
      <MdRenderer class="legal__renderer -SUPPORT" :content="legalDocsStore.translatedSupport" />
      <MdRenderer class="legal__renderer -SECURITY" :content="legalDocsStore.translatedSecurity" />
      <MdRenderer class="legal__renderer -THIRD_PARTY_LICENSES" :content="legalDocsStore.translatedThirdPartyLicenses" />
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
