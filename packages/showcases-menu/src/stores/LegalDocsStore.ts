import type { TDeepWriteable } from '@Anarchy/Shared/Utils';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TLegalDoc } from '@Showcases/Shared';
import { AllowedLegalDocNames } from '@Showcases/Shared';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useLegalDocsStore = defineStore('legalDocsStore', () => {
  const state: TDeepWriteable<Record<keyof typeof AllowedLegalDocNames, string | undefined>> = reactive({
    [AllowedLegalDocNames.EULA]: undefined,
    [AllowedLegalDocNames.NOTICE]: undefined,
    [AllowedLegalDocNames.DISCLAIMER]: undefined,
    [AllowedLegalDocNames.PRIVACY]: undefined,
    [AllowedLegalDocNames.INSTRUCTIONS]: undefined,
    [AllowedLegalDocNames.SBOM_POINTER]: undefined,
    [AllowedLegalDocNames.SECURITY]: undefined,
    [AllowedLegalDocNames.SUPPORT]: undefined,
    [AllowedLegalDocNames.THIRD_PARTY_LICENSES]: undefined
  });

  function setDoc(doc: TLegalDoc): void {
    if (isNotDefined(AllowedLegalDocNames[doc.name])) throw new Error(`[useLegalDocsStore] Cannot save an unknown document: "${doc.name}"`);
    state[doc.name] = doc.content;
  }

  return {
    state: computed(() => state),
    setDoc
  };
});
