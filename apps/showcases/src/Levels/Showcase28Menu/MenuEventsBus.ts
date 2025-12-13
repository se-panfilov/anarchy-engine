import type { TMenuEvent } from '@ShowcasesShared';
import { Subject } from 'rxjs';

export const menuEventsBus$: Subject<TMenuEvent> = new Subject<TMenuEvent>();
