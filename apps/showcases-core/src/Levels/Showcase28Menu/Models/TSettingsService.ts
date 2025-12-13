import type { TShowcaseGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  applyAppSettings: (appSettings: TShowcaseGameSettings) => boolean;
  isFirstRun: () => Promise<boolean>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
