import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  closeApp: () => void;
  getChromeVersion: () => string;
  getNodeVersion: () => string;
  getPlatformVersion: () => string;
  getWrappedAppVersion: () => Promise<string>;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  loadLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  restartApp: () => void;
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
}>;
