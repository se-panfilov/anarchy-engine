import type { TGameSettings } from '@ShowcasesShared';

export type TSettingsService = Readonly<{
  loadAppSettings: () => TGameSettings | undefined;
  saveAppSettings: (settings: TGameSettings) => void;
}>;
