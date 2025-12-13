import type { TShowcaseGameSettings } from '@ShowcasesShared';

export type TSettingsService = Readonly<{
  loadAppSettings: () => TShowcaseGameSettings | undefined;
  saveAppSettings: (settings: TShowcaseGameSettings) => void;
  isSettings: (settings: TShowcaseGameSettings | Record<string, any>) => settings is TShowcaseGameSettings;
}>;
