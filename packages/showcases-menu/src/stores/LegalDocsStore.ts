import type { TOptional, TWriteable } from '@Anarchy/Shared/Utils';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TLegalDoc, TShowcaseLocaleIds } from '@Showcases/Shared';
import { AllowedLegalDocNames } from '@Showcases/Shared';
import { defineStore } from 'pinia';
import type { ComputedRef } from 'vue';
import { computed, reactive } from 'vue';

type TLegalDocsStoreRecord = TOptional<Record<keyof typeof AllowedLegalDocNames, string | undefined>>;
type TLegalDocsStoreState = TWriteable<Record<TShowcaseLocaleIds, TLegalDocsStoreRecord>>;

export const useLegalDocsStore = defineStore('legalDocsStore', () => {
  const defaultLegalDocsLocaleId: TShowcaseLocaleIds = 'en-US';

  const state: TLegalDocsStoreState = reactive({
    'en-US': {
      // [AllowedLegalDocNames.EULA]: undefined,
      // [AllowedLegalDocNames.NOTICE]: undefined,
      // [AllowedLegalDocNames.DISCLAIMER]: undefined,
      // [AllowedLegalDocNames.PRIVACY]: undefined,
      // [AllowedLegalDocNames.INSTRUCTIONS]: undefined,
      // [AllowedLegalDocNames.SBOM_POINTER]: undefined,
      // [AllowedLegalDocNames.SECURITY]: undefined,
      // [AllowedLegalDocNames.SUPPORT]: undefined,
      // [AllowedLegalDocNames.THIRD_PARTY_LICENSES]: undefined
    },
    'nl-NL': {}
  });

  const settingsStore = useSettingsStore();

  const setDoc = (doc: TLegalDoc): void => setDocByLocale(doc, settingsStore.getLocaleId);

  function setDocByLocale(doc: TLegalDoc, localeId: TShowcaseLocaleIds): void {
    if (isNotDefined(AllowedLegalDocNames[doc.name])) throw new Error(`[useLegalDocsStore] Cannot save an unknown document: "${doc.name}"`);
    state[localeId][doc.name] = doc.content;
  }

  const findDoc = (name: keyof typeof AllowedLegalDocNames, localeId: TShowcaseLocaleIds): string | undefined => state[localeId][name] ?? state[defaultLegalDocsLocaleId][name];

  function getDoc(name: keyof typeof AllowedLegalDocNames, localeId: TShowcaseLocaleIds): string {
    const result: string | undefined = findDoc(name, localeId);
    if (isNotDefined(result)) throw new Error(`[useLegalDocsStore] Cannot get a document: "${name}" for localeId: "${localeId}"`);
    return result;
  }

  const translatedDisclaimer: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.DISCLAIMER, settingsStore.getLocaleId));
  const translatedEula: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.EULA, settingsStore.getLocaleId));
  const translatedInstructions: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.INSTRUCTIONS, settingsStore.getLocaleId));
  const translatedNotice: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.NOTICE, settingsStore.getLocaleId));
  const translatedPrivacy: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.PRIVACY, settingsStore.getLocaleId));
  const translatedSbomPointer: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.SBOM_POINTER, settingsStore.getLocaleId));
  const translatedSecurity: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.SECURITY, settingsStore.getLocaleId));
  const translatedSupport: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.SUPPORT, settingsStore.getLocaleId));
  const translatedThirdPartyLicenses: ComputedRef<string | undefined> = computed(() => findDoc(AllowedLegalDocNames.THIRD_PARTY_LICENSES, settingsStore.getLocaleId));

  return {
    findDoc,
    getDoc,
    setDoc,
    setDocByLocale,
    state: computed(() => state),
    translatedDisclaimer,
    translatedEula,
    translatedInstructions,
    translatedNotice,
    translatedPrivacy,
    translatedSbomPointer,
    translatedSecurity,
    translatedSupport,
    translatedThirdPartyLicenses
  };
});
