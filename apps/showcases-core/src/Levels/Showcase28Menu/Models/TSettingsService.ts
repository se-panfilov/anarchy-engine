import type { TShowcaseGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  applyAppSettings: (appSettings: TShowcaseGameSettings) => boolean;
}>;
