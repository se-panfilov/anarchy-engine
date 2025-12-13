import type { TLocale } from '@Anarchy/i18n';
import type { TDeepWriteable } from '@Anarchy/Shared/Utils';
import type { TAudioSettings, TDebugSettings, TGraphicsSettings, TInternalSettings, TLocalizationSettings, TResolution, TShowcaseGameSettings, TShowcaseLocaleIds } from '@Showcases/Shared';
import { ShowcasesLocales } from '@Showcases/Shared';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useSettingsStore = defineStore('settingsStore', () => {
  const state: TDeepWriteable<TShowcaseGameSettings> = reactive({
    graphics: {
      isFullScreen: false,
      // TODO DESKTOP: resolution should come from .env (desktop/mobile/web) or should be set by platform (detect default resolution)
      resolution: { width: 1920, height: 1080 }
    },
    audio: {
      masterVolume: 80
    },
    localization: {
      locale: ShowcasesLocales['en-US'] // TODO DESKTOP: should be set by platform (desktop/mobile/web) or from .env
    },
    debug: {
      isDebugMode: false
    },
    internal: {
      isFirstRun: true
    }
  });

  // TODO DESKTOP: available resolutions depends on platform (desktop/mobile/web). Should be set by platform or from .env
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
    const newLocale = ShowcasesLocales[id] as TLocale;
    if (!newLocale) throw new Error(`[Settings store] Locale with id "${id}" not found in ShowcasesLocales`);
    setLocalization({ locale: newLocale });
  }
  const setDebug = (newDebug: Partial<TDebugSettings>): void => void Object.assign(state.debug, { ...newDebug });
  const setInternal = (newInternal: Partial<TInternalSettings>): void => void Object.assign(state.internal, { ...newInternal });
  const setState = (newState: Partial<TShowcaseGameSettings>): void => void Object.assign(state, { ...newState });

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
    debug,
    setDebug,
    internal,
    setInternal,
    getAvailableResolutions
  };
});
