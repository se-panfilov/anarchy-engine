import type { TToGuiEvent } from '@Showcases/Shared';
import type { Observable, Subscription } from 'rxjs';

export type TEventsListenerService = Readonly<{
  setToGuiBus: (toGuiBus$: Observable<TToGuiEvent>) => void;
  startListeningAppEvents: () => Subscription;
  toGuiBus$: Observable<TToGuiEvent> | undefined;
}>;
