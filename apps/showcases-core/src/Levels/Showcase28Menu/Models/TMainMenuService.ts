import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

export type TMainMenuService = Readonly<{
  openMainMenu: () => void | never;
  closeMainMenu: () => void | never;
  saveSettings: (settings: TShowcaseGameSettings) => Promise<void>;
  closeApp: () => void;
  restartApp: () => void;
  loadSettings: () => Promise<TShowcaseGameSettings>;
  loadLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
}>;
