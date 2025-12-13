import type { TShowcaseGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  applyPlatformSettings: (platformSettings: TShowcaseGameSettings) => boolean;
}>;
