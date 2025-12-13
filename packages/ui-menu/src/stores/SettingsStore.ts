import type { TDeepWriteable } from '@Engine';
import { Languages } from '@Menu/constants';
import type { TGameSettings } from 'anarchy_engine_showcases/src/Levels/Showcase28Menu/Models';
import type { TResolution } from 'anarchy_engine_showcases_desktop/src/Models';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useSettingsStore = defineStore('settingsStore', () => {
  const state: TDeepWriteable<TGameSettings> = reactive({
    graphics: {
      isFullScreen: false,
      // TODO DESKTOP: resolution should come from .env (desktop/mobile/web) or should be set by platform (detect default resolution)
      resolution: { width: 1920, height: 1080 }
    },
    audio: {
      masterVolume: 80
    },
    localization: {
      language: Languages.EN
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

  return { ...state, getAvailableResolutions };
});
