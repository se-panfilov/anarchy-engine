import type { TLocaleId } from '@Anarchy/i18n';
import type { TResolution, TShowcaseGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  applyPlatformSettings: (platformSettings: TShowcaseGameSettings) => boolean;
  detectResolution: () => TResolution;
  getPreferredLocales: () => ReadonlyArray<TLocaleId>;
  readAppSettings: () => Promise<TShowcaseGameSettings>;
  writeAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  updateAppSettings: (settings: Partial<TShowcaseGameSettings>) => Promise<TShowcaseGameSettings>;
}>;
