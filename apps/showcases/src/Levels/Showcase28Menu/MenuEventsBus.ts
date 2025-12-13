import type { TMenuEvent } from '@Menu/models';
import { Subject } from 'rxjs';

export const menuEventsBus$: Subject<TMenuEvent> = new Subject<TMenuEvent>();
