import type { TShowcaseGameSettings } from '@ShowcasesShared';

export type TSettingsService = Readonly<{
  loadAppSettings: () => TShowcaseGameSettings | undefined;
  saveAppSettings: (settings: TShowcaseGameSettings) => void;
}>;
