import type { TFromGuiActionPayload } from '@Showcases/GUI/models/TFromGuiActionEvent';
import type { TFromGuiEvent } from '@Showcases/Shared';
import type { Subject } from 'rxjs';

export type TEventsEmitterService = Readonly<{
  emitActionEvent: (payload: TFromGuiActionPayload) => void;
  emitCloseGui: () => void;
  emitEvent: (event: TFromGuiEvent) => void | never;
  setFromGuiBus: (fromGuiBus$: Subject<TFromGuiEvent>) => void;
}>;
