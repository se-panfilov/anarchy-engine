import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  loadLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getNodeVersion: () => string;
  getChromeVersion: () => string;
  getPlatformVersion: () => string;
  getWrappedAppVersion: () => Promise<string>;
}>;
