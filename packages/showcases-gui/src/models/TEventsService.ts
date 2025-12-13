import type { TFromGuiActionPayload } from '@Showcases/GUI/models/TFromGuiActionEvent';
import type { TFromGuiEvent, TToGuiEvent } from '@Showcases/Shared';
import type { Observable, Subject, Subscription } from 'rxjs';

export type TEventsService = Readonly<{
  emitActionEvent: (payload: TFromGuiActionPayload) => void;
  emitCloseGui: () => void;
  emitEvent: (event: TFromGuiEvent) => void | never;
  setFromGuiBus: (fromGuiBus$: Subject<TFromGuiEvent>) => void;
  setToGuiBus: (toGuiBus$: Observable<TToGuiEvent>) => void;
  startListeningAppEvents: () => Subscription;
  toGuiBus$: Observable<TToGuiEvent> | undefined;
}>;
