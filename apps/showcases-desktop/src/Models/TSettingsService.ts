import type { TLocaleId } from '@Anarchy/i18n';
import type { TResolution, TShowcasesGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  applyPlatformSettings: (platformSettings: TShowcasesGameSettings) => boolean;
  detectResolution: () => TResolution;
  getAppSettings: () => Promise<TShowcasesGameSettings>;
  getPreferredLocales: () => ReadonlyArray<TLocaleId>;
  setAppSettings: (settings: TShowcasesGameSettings) => Promise<void>;
  updateAppSettings: (settings: Partial<TShowcasesGameSettings>) => Promise<TShowcasesGameSettings>;
}>;
