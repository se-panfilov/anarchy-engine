import type { TShowcasesGameSettings } from '@Showcases/Shared';

export type TSettingsService = Readonly<{
  applyAppSettings: (appSettings: TShowcasesGameSettings) => boolean;
  isFirstRun: () => Promise<boolean>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
