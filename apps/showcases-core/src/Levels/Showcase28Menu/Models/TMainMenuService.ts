import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

export type TMainMenuService = Readonly<{
  closeApp: () => void;
  closeMainMenu: () => void | never;
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getSettings: () => Promise<TShowcaseGameSettings>;
  openMainMenu: () => void | never;
  restartApp: () => void;
  setSettings: (settings: TShowcaseGameSettings) => Promise<void>;
}>;
