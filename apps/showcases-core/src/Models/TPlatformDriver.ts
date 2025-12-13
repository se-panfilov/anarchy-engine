import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  closeApp: () => void;
  getChromeVersion: () => string;
  getNodeVersion: () => string;
  getPlatformVersion: () => string;
  getWrappedAppVersion: () => Promise<string>;
  getAppSettings: () => Promise<TShowcaseGameSettings>;
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  restartApp: (args?: ReadonlyArray<string>) => void;
  setAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
