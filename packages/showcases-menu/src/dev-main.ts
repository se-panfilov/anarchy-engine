import { initMenuApp } from '@Showcases/Menu/main';
import type { TFromMenuEvent, TToMenuEvent } from '@Showcases/Shared';
import { Subject } from 'rxjs';

const fromMenuBus$: Subject<TFromMenuEvent> = new Subject<TFromMenuEvent>();
const toMenuBus$: Subject<TToMenuEvent> = new Subject<TToMenuEvent>();

fromMenuBus$.subscribe((event: TFromMenuEvent): void => {
  console.log('[Dev Main]: Event received:', event);
});

initMenuApp('#menu', fromMenuBus$, toMenuBus$.asObservable());
