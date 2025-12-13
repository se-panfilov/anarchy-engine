import type { TMenuEvent } from '@ShowcasesShared';
import type { Subject } from 'rxjs';

export type TEventsService = Readonly<{
  setBus: (bus: Subject<TMenuEvent>) => void;
  emitClose: () => void | never;
  emitStartNew: () => void | never;
  emitContinue: () => void | never;
  emitLoad: () => void | never;
}>;
