import type { TFromMenuEvent, TLoadDocPayload, TShowcasesGameSettings } from '@Showcases/Shared';
import type { Subject } from 'rxjs';

export type TEventsEmitterService = Readonly<{
  emitCloseMenu: () => void | never;
  emitContinueGame: () => void | never;
  emitExitApp: () => void | never;
  emitGetLegalDocs: (payload: TLoadDocPayload) => void | never;
  emitGetMenuSettings: () => void | never;
  emitLoadGame: () => void | never;
  emitSetMenuSettings: (settings: TShowcasesGameSettings) => void | never;
  emitStartNewGame: () => void | never;
  setFromMenuBus: (fromMenuBus$: Subject<TFromMenuEvent>) => void;
}>;
