import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';

import type { TShowcaseGameSettings } from './TShowcaseGameSettings';

export type TShowcasesDesktopApi = Readonly<{
  saveAppSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  loadAppSettings: () => Promise<TShowcaseGameSettings>;
  loadLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  node: () => string;
  chrome: () => string;
  electron: () => string;
  desktopAppVersion: () => Promise<string>;
}>;
