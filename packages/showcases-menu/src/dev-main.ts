import { initMenuApp } from '@Menu/main';
import type { TMenuEvent } from '@ShowcasesShared';
import { Subject } from 'rxjs';

const bus$: Subject<TMenuEvent> = new Subject<TMenuEvent>();

bus$.subscribe((event: TMenuEvent): void => {
  console.log('[Dev Main]: Event received:', event);
});

initMenuApp('#menu', bus$);
