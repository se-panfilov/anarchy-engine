import type { TFromMenuEvent, TToMenuEvent } from '@Showcases/Shared';
import { initMenuApp } from '@Showcases/GUI/main';
import { Subject } from 'rxjs';

const fromMenuBus$: Subject<TFromMenuEvent> = new Subject<TFromMenuEvent>();
const toMenuBus$: Subject<TToMenuEvent> = new Subject<TToMenuEvent>();

fromMenuBus$.subscribe((event: TFromMenuEvent): void => {
  console.log('[Dev Main]: Event received:', event);
});

initMenuApp('#gui', fromMenuBus$, toMenuBus$.asObservable());
