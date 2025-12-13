import type { TShowcaseGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  // TODO DESKTOP: fix return type of "loadLegalDocs"
  loadLegalDocs: () => Promise<string>;
  getNodeVersion: () => string;
  getChromeVersion: () => string;
  getPlatformVersion: () => string;
  getWrappedAppVersion: () => Promise<string>;
}>;
