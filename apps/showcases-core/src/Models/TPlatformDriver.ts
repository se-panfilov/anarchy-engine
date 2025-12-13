import type { TLocaleId } from '@Anarchy/i18n';
import type { TBrowserInfo } from '@Anarchy/Shared/Models';
import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  closeApp: () => void;
  getAppSettings: () => Promise<TShowcaseGameSettings>;
  getBrowserInfo: () => TBrowserInfo;
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getNodeVersion: () => string;
  getPlatformVersion: () => string;
  getPreferredLocales: () => Promise<ReadonlyArray<TLocaleId>>;
  getWrappedAppVersion: () => Promise<string>;
  restartApp: (args?: ReadonlyArray<string>) => void;
  setAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
