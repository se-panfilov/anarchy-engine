import type { TResolution, TShowcaseGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  applyPlatformSettings: (platformSettings: TShowcaseGameSettings) => boolean;
  detectResolution: () => TResolution;
  getScreenRatio: () => number;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
}>;
