import type { TToMenuEvent } from '@Showcases/Shared';
import type { Observable, Subscription } from 'rxjs';

export type TEventsListenerService = Readonly<{
  setToMenuBus: (toMenuBus$: Observable<TToMenuEvent>) => void;
  startListeningAppEvents: () => Subscription;
  toMenuBus$: Observable<TToMenuEvent> | undefined;
}>;
