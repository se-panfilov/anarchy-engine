import type { Subject } from 'rxjs';

import type { TMenuEvent } from './TMenuEvent';

export type TEventsService = Readonly<{
  setBus: (bus: Subject<TMenuEvent>) => void;
  emitClose: () => void | never;
}>;
