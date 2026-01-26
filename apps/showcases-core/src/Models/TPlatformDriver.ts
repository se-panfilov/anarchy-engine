import type { TLocaleId } from '@Anarchy/i18n';
import type { TBrowserInfo } from '@Anarchy/Shared/Models';
import type { TDistName, TLegalDoc, TLoadDocPayload, TReleaseName, TShowcasesGameSettings } from '@Showcases/Shared';

export type TPlatformDriver = Readonly<{
  closeApp: () => void;
  getAppSettings: () => Promise<TShowcasesGameSettings>;
  getBrowserInfo: () => TBrowserInfo;
  getCachedAppSettings: () => TShowcasesGameSettings | undefined;
  getDistName: () => Promise<TDistName>; //DistName is something like "darwin-arm64" (`${process.platform}-${process.arch}`)
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getNodeVersion: () => string;
  getPackagesVersions: () => Promise<Record<string, string>>;
  getPlatformVersion: () => string;
  getPreferredLocales: () => Promise<ReadonlyArray<TLocaleId>>;
  getReleaseName: () => Promise<TReleaseName>; //Release name is something like "showcases-desktop@1.0.0" (`{name}@{version}`)
  getWrappedAppVersion: () => Promise<string>;
  restartApp: (args?: ReadonlyArray<string>) => void;
  setAppSettings: (settings: TShowcasesGameSettings) => Promise<void>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
