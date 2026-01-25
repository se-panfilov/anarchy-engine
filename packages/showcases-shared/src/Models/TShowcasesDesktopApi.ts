import type { TLocaleId } from '@Anarchy/i18n';
import type { TBrowserInfo } from '@Anarchy/Shared/Models';

import type { TDistName } from './TDistName';
import type { TLegalDoc } from './TLegalDoc';
import type { TLoadDocPayload } from './TLoadDocPayload';
import type { TReleaseName } from './TReleaseName';
import type { TShowcasesGameSettings } from './TShowcasesGameSettings';

export type TShowcasesDesktopApi = Readonly<{
  closeApp: () => void;
  desktopAppVersion: () => Promise<string>;
  electron: () => string;
  getAppSettings: () => Promise<TShowcasesGameSettings>;
  getBrowserInfo: () => TBrowserInfo;
  getDistName: () => Promise<TDistName>;
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getPackagesVersions: () => Promise<Record<string, string>>;
  getPreferredLocales: () => Promise<ReadonlyArray<TLocaleId>>;
  getReleaseName: () => Promise<TReleaseName>;
  node: () => string;
  restartApp: () => void;
  setAppSettings: (settings: TShowcasesGameSettings) => Promise<void>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
