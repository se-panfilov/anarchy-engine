import { isNotDefined } from '@Anarchy/Shared/Utils';
import { createFromGuiActionEvent } from '@Showcases/GUI/events';
import type { TEventsService, TToGuiActionEvent } from '@Showcases/GUI/models';
import type { TFromGuiActionPayload } from '@Showcases/GUI/models/TFromGuiActionEvent';
import { keyActionsService } from '@Showcases/GUI/services/KeyActionsService';
import type { TFromGuiEvent, TToGuiEvent } from '@Showcases/Shared';
import { FromGuiEvents, ToGuiEvents } from '@Showcases/Shared';
import type { Observable, Subject, Subscription } from 'rxjs';

const { CloseGui } = FromGuiEvents;

function EventsService(): TEventsService {
  let fromGuiBus$: Subject<TFromGuiEvent> | undefined;
  let toGuiBus$: Observable<TToGuiEvent> | undefined;

  const setFromGuiBus = (bus: Subject<TFromGuiEvent>): void => void (fromGuiBus$ = bus);
  const setToGuiBus = (bus: Observable<TToGuiEvent>): void => void (toGuiBus$ = bus);

  const noBusError = '[EventsService]: fromGuiBus$ is not defined. Call setBus() first.';

  function emitEvent(event: TFromGuiEvent): void | never {
    if (isNotDefined(fromGuiBus$)) throw new Error(noBusError);
    return fromGuiBus$.next(event);
  }

  const emitActionEvent = (payload?: TFromGuiActionPayload): void => emitEvent(createFromGuiActionEvent(payload));
  const emitCloseGui = (): void => emitEvent({ type: CloseGui });

  function startListeningAppEvents(): Subscription {
    if (isNotDefined(toGuiBus$)) throw new Error('[EventsService]: toGuiBus$ is not defined. Call setToGuiBus() first.');
    return toGuiBus$.subscribe(handleToGuiEvents);
  }

  function handleToGuiEvents(event: TToGuiEvent | TToGuiActionEvent): void {
    switch (event.type) {
      case ToGuiEvents.KeyAction: {
        keyActionsService.onAction((event as TToGuiActionEvent).payload);
        break;
      }
      default: {
        throw new Error('[EventsService]: Unknown event type received in toGuiBus$');
      }
    }
  }

  return {
    emitActionEvent,
    emitCloseGui,
    emitEvent,
    setFromGuiBus,
    setToGuiBus,
    startListeningAppEvents,
    toGuiBus$
  };
}

export const eventsService: TEventsService = EventsService();
