import type { TGameSettings } from '@ShowcasesShared';

export type TPlatformDriver = Readonly<{
  saveAppSettings: (settings: TGameSettings) => Promise<void>;
  loadAppSettings: () => Promise<TGameSettings>;
  getNodeVersion: () => string;
  getChromeVersion: () => string;
  getPlatformVersion: () => string;
  getWrappedAppVersion: () => Promise<string>;
}>;
