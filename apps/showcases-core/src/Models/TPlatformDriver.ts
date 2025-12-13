import type { TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  // TODO DESKTOP: fix return type of "loadLegalDocs"
  loadLegalDocs: (options: TLoadDocPayload) => Promise<string>;
  getNodeVersion: () => string;
  getChromeVersion: () => string;
  getPlatformVersion: () => string;
  getWrappedAppVersion: () => Promise<string>;
}>;
