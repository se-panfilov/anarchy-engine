import type { TLocaleId } from '@Anarchy/i18n';
import type { TBrowserInfo } from '@Anarchy/Shared/Models';
import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';

import type { TShowcaseGameSettings } from './TShowcaseGameSettings';

export type TShowcasesDesktopApi = Readonly<{
  closeApp: () => void;
  desktopAppVersion: () => Promise<string>;
  electron: () => string;
  getAppSettings: () => Promise<TShowcaseGameSettings>;
  getBrowserInfo: () => TBrowserInfo;
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getPreferredLocales: () => Promise<ReadonlyArray<TLocaleId>>;
  node: () => string;
  restartApp: () => void;
  setAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
}>;
