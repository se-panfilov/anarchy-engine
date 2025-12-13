import type { TLocale, TLocaleId } from '@Anarchy/i18n';
import type { TDeepWriteable } from '@Anarchy/Shared/Utils';
import { vueTranslationService } from '@Showcases/Menu/services';
import type { TAudioSettings, TDebugSettings, TGraphicsSettings, TInternalSettings, TLocalizationSettings, TResolution, TShowcaseGameSettings, TShowcaseLocaleIds } from '@Showcases/Shared';
import { ShowcasesLocales } from '@Showcases/Shared';
import { defineStore } from 'pinia';
import type { ComputedRef } from 'vue';
import { computed, reactive, watch } from 'vue';

export const useSettingsStore = defineStore('settingsStore', () => {
  const state: TDeepWriteable<TShowcaseGameSettings> = reactive({
    graphics: {
      isFullScreen: false,
      // TODO DESKTOP: resolution should come from .env or should be set by platform (detect default resolution)
      resolution: { width: 1920, height: 1080 }
    },
    audio: {
      masterVolume: 80
    },
    localization: {
      // TODO DESKTOP: should be set by platform or from .env
      locale: ShowcasesLocales['en-US']
    },
    debug: {
      // TODO DESKTOP: should be set by platform or from .env
      isDebugMode: false
    },
    internal: {
      // TODO DESKTOP: should be set by platform (settings file)
      isFirstRun: true
    }
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

  // TODO DESKTOP: available resolutions depends on platform. Should be set by platform or from .env
  function getAvailableResolutions(): ReadonlyArray<TResolution> {
    return [
      { width: 1920, height: 1080 },
      { width: 1280, height: 720 },
      { width: 800, height: 600 }
    ];
  }

  const graphics = computed(() => state.graphics);
  const audio = computed(() => state.audio);
  const localization = computed(() => state.localization);
  const debug = computed(() => state.debug);
  const internal = computed(() => state.internal);

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
    setInternal,
    getAvailableResolutions
  };
});
