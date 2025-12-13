import type { TShowcaseGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  loadAppSettings: () => TShowcaseGameSettings | undefined;
  saveAppSettings: (settings: TShowcaseGameSettings) => void;
}>;
