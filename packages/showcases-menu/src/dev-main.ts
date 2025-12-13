import { initMenuApp } from '@Menu/main';
import type { TFromMenuEvent } from '@ShowcasesShared';
import { Subject } from 'rxjs';

const fromMenuBus$: Subject<TFromMenuEvent> = new Subject<TFromMenuEvent>();
const toMenuBus$: Subject<TFromMenuEvent> = new Subject<TFromMenuEvent>();

fromMenuBus$.subscribe((event: TFromMenuEvent): void => {
  console.log('[Dev Main]: Event received:', event);
});

initMenuApp('#menu', fromMenuBus$, toMenuBus$.asObservable());
