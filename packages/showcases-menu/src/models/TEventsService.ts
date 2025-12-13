import type { TMenuEvent, TShowcaseGameSettings } from '@ShowcasesShared';
import type { Subject } from 'rxjs';

export type TEventsService = Readonly<{
  setBus: (bus: Subject<TMenuEvent>) => void;
  emitCloseMenu: () => void | never;
  emitSaveMenuSettings: (settings: TShowcaseGameSettings) => void | never;
  emitLoadMenuSettings: () => void | never;
  emitStartNewGame: () => void | never;
  emitContinueGame: () => void | never;
  emitLoadGame: () => void | never;
}>;
