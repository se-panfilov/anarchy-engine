import type { TDeepWriteable } from '@Engine';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import type { TGameSettings } from '@/Levels/Showcase28Menu/Models';

export const useSettingsStore = defineStore('settingsStore', () => {
  const state: TDeepWriteable<TGameSettings> = reactive({
    graphics: {
      isFullscreen: false,
      // TODO DESKTOP:  resolution should come from .env (desktop/mobile/web)
      resolution: { width: 1920, height: 1080 }
    },
    audio: {
      masterVolume: 80
    },
    localization: {
      // TODO DESKTOP: should be an enum
      language: 'en'
    },
    debug: {
      isDebugMode: false
    },
    internal: {
      isFirstRun: true
    }
  });

  return { ...state };
});
