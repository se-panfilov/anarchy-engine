import type { TLocaleId } from '@Anarchy/i18n';
import type { TResolution, TShowcaseGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  applyPlatformSettings: (platformSettings: TShowcaseGameSettings) => boolean;
  detectResolution: () => TResolution;
  getPreferredLocales: () => ReadonlyArray<TLocaleId>;
  getScreenRatio: () => number;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
}>;
