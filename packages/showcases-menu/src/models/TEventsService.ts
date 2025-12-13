import type { TFromMenuEvent, TLoadDocPayload, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import type { Observable, Subject, Subscription } from 'rxjs';

export type TEventsService = Readonly<{
  emitCloseMenu: () => void | never;
  emitContinueGame: () => void | never;
  emitExitApp: () => void | never;
  emitGetLegalDocs: (payload: TLoadDocPayload) => void | never;
  emitGetMenuSettings: () => void | never;
  emitLoadGame: () => void | never;
  emitSetMenuSettings: (settings: TShowcaseGameSettings) => void | never;
  emitStartNewGame: () => void | never;
  setFromMenuBus: (fromMenuBus$: Subject<TFromMenuEvent>) => void;
  setToMenuBus: (toMenuBus$: Observable<TToMenuEvent>) => void;
  startListeningAppEvents: () => Subscription;
  toMenuBus$: Observable<TToMenuEvent> | undefined;
}>;
