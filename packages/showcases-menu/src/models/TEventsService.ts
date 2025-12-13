import type { TFromMenuEvent, TShowcaseGameSettings, TToMenuEvent } from '@ShowcasesShared';
import type { Observable, Subject } from 'rxjs';

export type TEventsService = Readonly<{
  setFromMenuBus: (fromMenuBus$: Subject<TFromMenuEvent>) => void;
  setToMenuBus: (toMenuBus$: Observable<TToMenuEvent>) => void;
  emitCloseMenu: () => void | never;
  emitSaveMenuSettings: (settings: TShowcaseGameSettings) => void | never;
  emitLoadMenuSettings: () => void | never;
  emitStartNewGame: () => void | never;
  emitContinueGame: () => void | never;
  emitLoadGame: () => void | never;
  toMenuBus$: Observable<TToMenuEvent> | undefined;
}>;
