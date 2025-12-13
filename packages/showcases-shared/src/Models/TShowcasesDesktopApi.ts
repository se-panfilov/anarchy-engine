import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';

import type { TShowcaseGameSettings } from './TShowcaseGameSettings';

export type TShowcasesDesktopApi = Readonly<{
  chrome: () => string;
  closeApp: () => void;
  desktopAppVersion: () => Promise<string>;
  electron: () => string;
  readAppSettings: () => Promise<TShowcaseGameSettings>;
  loadLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  node: () => string;
  restartApp: () => void;
  setFirstRun: (isFirstRun: boolean) => Promise<void>;
  writeAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
}>;
