import type { TShowcaseGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  getNodeVersion: () => string;
  getChromeVersion: () => string;
  getPlatformVersion: () => string;
  getWrappedAppVersion: () => Promise<string>;
}>;
