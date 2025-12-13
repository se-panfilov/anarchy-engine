<script setup lang="ts">
import { isNotDefined } from '@Anarchy/Shared/Utils';
import MdRenderer from '@Showcases/Menu/components/MdRenderer.vue';
import Navigation from '@Showcases/Menu/components/Navigation/Navigation.vue';
import SettingsGroup from '@Showcases/Menu/components/SettingsGroup.vue';
import View from '@Showcases/Menu/components/View.vue';
import ViewForm from '@Showcases/Menu/components/ViewForm.vue';
import { eventsService, vueTranslationService } from '@Showcases/Menu/services';
import { useLegalDocsStore } from '@Showcases/Menu/stores/LegalDocsStore';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TShowcaseLocaleIds } from '@Showcases/Shared';
import { AllowedLegalDocNames } from '@Showcases/Shared';
import type { ShallowRef } from 'vue';
import { onMounted } from 'vue';

// TODO DESKTOP: LEGAL: change legal folders to /legal/{locale} (also public/legal/{locale}, assets/legal/{locale})
onMounted(() => {
  if (isNotDefined(useLegalDocsStore().state.EULA)) eventsService.emitLoadLegalDocs({ name: AllowedLegalDocNames.EULA, locale: useSettingsStore().localization.locale.id as TShowcaseLocaleIds });
});

const { $t } = vueTranslationService;

const viewTitleText: ShallowRef<string> = $t('main-menu.settings.legal.view.title');
const mainSettingsGroupTitleText: ShallowRef<string> = $t('main-menu.settings.legal.group.main-legal-settings.title');
</script>

<template>
  <View class="legal" :title="viewTitleText">
    <ViewForm name="legal" class="legal__view-form">
      <SettingsGroup :title="mainSettingsGroupTitleText">
        <MdRenderer class="legal__renderer" :content="useLegalDocsStore().state.EULA" />
      </SettingsGroup>
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
