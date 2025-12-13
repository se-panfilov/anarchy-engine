import { initGuiApp } from '@Showcases/GUI/main';
import type { TFromGuiEvent, TToGuiEvent } from '@Showcases/Shared';
import { Subject } from 'rxjs';

const fromGuiBus$: Subject<TFromGuiEvent> = new Subject<TFromGuiEvent>();
const toGuiBus$: Subject<TToGuiEvent> = new Subject<TToGuiEvent>();

fromGuiBus$.subscribe((event: TFromGuiEvent): void => {
  console.log('[Dev Main]: Event received:', event);
});

initGuiApp('#gui', fromGuiBus$, toGuiBus$.asObservable());
