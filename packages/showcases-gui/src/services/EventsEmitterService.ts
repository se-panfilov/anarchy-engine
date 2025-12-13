import { isNotDefined } from '@Anarchy/Shared/Utils';
import { createFromGuiActionEvent } from '@Showcases/GUI/events';
import type { TEventsEmitterService } from '@Showcases/GUI/models';
import type { TFromGuiActionPayload } from '@Showcases/GUI/models/TFromGuiActionEvent';
import type { TFromGuiEvent } from '@Showcases/Shared';
import { FromGuiEvents } from '@Showcases/Shared';
import type { Subject } from 'rxjs';

const { CloseGui } = FromGuiEvents;

function EventsEmitterService(): TEventsEmitterService {
  let fromGuiBus$: Subject<TFromGuiEvent> | undefined;

  const setFromGuiBus = (bus: Subject<TFromGuiEvent>): void => void (fromGuiBus$ = bus);

  const noBusError = '[EventsService]: fromGuiBus$ is not defined. Call setBus() first.';

  function emitEvent(event: TFromGuiEvent): void | never {
    if (isNotDefined(fromGuiBus$)) throw new Error(noBusError);
    return fromGuiBus$.next(event);
  }

  const emitActionEvent = (payload: TFromGuiActionPayload): void => emitEvent(createFromGuiActionEvent(payload));
  const emitCloseGui = (): void => emitEvent({ type: CloseGui });

  return {
    emitActionEvent,
    emitCloseGui,
    emitEvent,
    setFromGuiBus
  };
}

export const eventsEmitterService: TEventsEmitterService = EventsEmitterService();
