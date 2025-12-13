import type { TFromMenuEvent, TLoadDocPayload, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import type { Observable, Subject, Subscription } from 'rxjs';

export type TEventsService = Readonly<{
  setFromMenuBus: (fromMenuBus$: Subject<TFromMenuEvent>) => void;
  setToMenuBus: (toMenuBus$: Observable<TToMenuEvent>) => void;
  emitCloseMenu: () => void | never;
  emitSaveMenuSettings: (settings: TShowcaseGameSettings) => void | never;
  emitLoadMenuSettings: () => void | never;
  emitLoadLegalDocs: (payload: TLoadDocPayload) => void | never;
  emitStartNewGame: () => void | never;
  emitContinueGame: () => void | never;
  emitLoadGame: () => void | never;
  startListeningAppEvents: () => Subscription;
  toMenuBus$: Observable<TToMenuEvent> | undefined;
}>;
