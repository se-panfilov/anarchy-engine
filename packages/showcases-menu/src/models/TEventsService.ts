import type { TFromMenuEvent, TLoadDocPayload, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import type { Observable, Subject, Subscription } from 'rxjs';

export type TEventsService = Readonly<{
  emitCloseMenu: () => void | never;
  emitContinueGame: () => void | never;
  emitExitApp: () => void | never;
  emitLoadGame: () => void | never;
  emitLoadLegalDocs: (payload: TLoadDocPayload) => void | never;
  emitLoadMenuSettings: () => void | never;
  emitSaveMenuSettings: (settings: TShowcaseGameSettings) => void | never;
  emitStartNewGame: () => void | never;
  setFromMenuBus: (fromMenuBus$: Subject<TFromMenuEvent>) => void;
  setToMenuBus: (toMenuBus$: Observable<TToMenuEvent>) => void;
  startListeningAppEvents: () => Subscription;
  toMenuBus$: Observable<TToMenuEvent> | undefined;
}>;
