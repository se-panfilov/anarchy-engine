import type { TFromMenuEvent, TToMenuEvent } from '@Showcases/Shared';
import { Subject } from 'rxjs';

export const fromMenuEventsBus$: Subject<TFromMenuEvent> = new Subject<TFromMenuEvent>();
export const toMenuEventsBus$: Subject<TToMenuEvent> = new Subject<TToMenuEvent>();
