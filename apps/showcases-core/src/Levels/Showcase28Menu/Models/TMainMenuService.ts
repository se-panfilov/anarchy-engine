import type { TLegalDoc, TLoadDocPayload, TShowcasesGameSettings } from '@Showcases/Shared';

export type TMainMenuService = Readonly<{
  closeApp: () => void;
  closeMainMenu: () => void | never;
  getLegalDocs: (options: TLoadDocPayload) => Promise<TLegalDoc>;
  getSettings: () => Promise<TShowcasesGameSettings>;
  isMenuActive: () => boolean;
  openMainMenu: () => void | never;
  restartApp: () => void;
  setSettings: (settings: TShowcasesGameSettings) => Promise<void>;
}>;
