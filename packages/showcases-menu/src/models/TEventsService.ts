import type { TMenuEvent } from '@ShowcasesShared';
import type { Subject } from 'rxjs';

export type TEventsService = Readonly<{
  setBus: (bus: Subject<TMenuEvent>) => void;
  emitCloseMenu: () => void | never;
  emitStartNewGame: () => void | never;
  emitContinueGame: () => void | never;
  emitLoadGame: () => void | never;
}>;
