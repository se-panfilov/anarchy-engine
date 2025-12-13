import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';

import type { TShowcaseGameSettings } from './TShowcaseGameSettings';

export type TShowcasesDesktopApi = Readonly<{
  chrome: () => string;
  closeApp: () => void;
  desktopAppVersion: () => Promise<string>;
  electron: () => string;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  loadLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  node: () => string;
  restartApp: () => void;
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
}>;
