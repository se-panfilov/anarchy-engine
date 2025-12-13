import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  closeApp: () => void;
  getChromeVersion: () => string;
  getNodeVersion: () => string;
  getPlatformVersion: () => string;
  getWrappedAppVersion: () => Promise<string>;
  readAppSettings: () => Promise<TShowcaseGameSettings>;
  loadLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  restartApp: (args?: ReadonlyArray<string>) => void;
  writeAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
}>;
