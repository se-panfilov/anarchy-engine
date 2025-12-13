import type { TLocale, TLocaleId } from '@Anarchy/i18n';
import type { TDeepWriteable } from '@Anarchy/Shared/Utils';
import type { TShowcaseLocaleIds } from '@Showcases/i18n';
import { ShowcasesLocales, vueTranslationService } from '@Showcases/i18n';
import type { TAudioSettings, TDebugSettings, TGraphicsSettings, TInternalSettings, TLocalizationSettings, TShowcaseGameSettings } from '@Showcases/Shared';
import { DefaultShowcaseGameSettings } from '@Showcases/Shared';
import { defineStore } from 'pinia';
import type { ComputedRef } from 'vue';
import { computed, reactive, watch } from 'vue';

export const useSettingsStore = defineStore('settingsStore', () => {
  const state: TDeepWriteable<TShowcaseGameSettings> = reactive({
    ...DefaultShowcaseGameSettings
  });

  const onLocaleChanged = (nextLocale: TLocale): void => vueTranslationService.locale$.next(nextLocale);

  watch(
    () => state.localization.locale.id,
    (_nextId: TLocaleId): void => {
      onLocaleChanged(state.localization.locale);
    },
    {
      flush: 'post' // Effect after commit of reactive events
      // immediate: true // Execute immediately on first run
    }
  );

  const graphics: ComputedRef<TGraphicsSettings> = computed((): TGraphicsSettings => state.graphics);
  const audio: ComputedRef<TAudioSettings> = computed((): TAudioSettings => state.audio);
  const localization: ComputedRef<TLocalizationSettings> = computed((): TLocalizationSettings => state.localization);
  const debug: ComputedRef<TDebugSettings> = computed((): TDebugSettings => state.debug);
  const internal: ComputedRef<TInternalSettings> = computed((): TInternalSettings => state.internal);

  const setGraphics = (newGraphics: Partial<TGraphicsSettings>): void => void Object.assign(state.graphics, { ...newGraphics });
  const setAudio = (newAudio: Partial<TAudioSettings>): void => void Object.assign(state.audio, { ...newAudio });
  const setLocalization = (newLocalization: Partial<TLocalizationSettings>): void => void Object.assign(state.localization, { ...newLocalization });
  function setLocaleById(id: TShowcaseLocaleIds): void | never {
    const newLocale = ShowcasesLocales[id];
    if (!newLocale) throw new Error(`[Settings store] Locale with id "${id}" not found in ShowcasesLocales`);
    setLocalization({ locale: newLocale });
  }
  const setDebug = (newDebug: Partial<TDebugSettings>): void => void Object.assign(state.debug, { ...newDebug });
  const setInternal = (newInternal: Partial<TInternalSettings>): void => void Object.assign(state.internal, { ...newInternal });
  const setState = (newState: Partial<TShowcaseGameSettings>): void => void Object.assign(state, { ...newState });

  const getLocaleId: ComputedRef<TShowcaseLocaleIds> = computed(() => state.localization.locale.id as TShowcaseLocaleIds);

  return {
    state: computed(() => state),
    setState,
    graphics,
    setGraphics,
    audio,
    setAudio,
    localization,
    setLocalization,
    setLocaleById,
    getLocaleId,
    debug,
    setDebug,
    internal,
    setInternal
  };
});
