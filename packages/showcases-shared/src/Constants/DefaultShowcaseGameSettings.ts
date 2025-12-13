import { ShowcasesLocales } from '@Showcases/i18n';
import type { TShowcaseGameSettings } from '@Showcases/Shared/Models';

export const DefaultShowcaseGameSettings: TShowcaseGameSettings = {
  graphics: {
    // isFullScreen: false,
    // resolution: { width: 800, height: 600 }
    brightness: 50,
    contrast: 50
  },
  audio: {
    masterVolume: 80
  },
  localization: {
    locale: ShowcasesLocales['en-US']
  },
  debug: {
    isDebugMode: false
  },
  internal: {
    isFirstRun: true
  }
};
