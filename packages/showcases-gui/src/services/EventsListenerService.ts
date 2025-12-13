import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TEventsListenerService, TToGuiActionEvent } from '@Showcases/GUI/models';
import { keyActionsService } from '@Showcases/GUI/services/KeyActionsService';
import type { TToGuiEvent } from '@Showcases/Shared';
import { ToGuiEvents } from '@Showcases/Shared';
import type { Observable, Subscription } from 'rxjs';

function EventsListenerService(): TEventsListenerService {
  let toGuiBus$: Observable<TToGuiEvent> | undefined;

  const setToGuiBus = (bus: Observable<TToGuiEvent>): void => void (toGuiBus$ = bus);

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
    setToGuiBus,
    startListeningAppEvents,
    toGuiBus$
  };
}

export const eventsListenerService: TEventsListenerService = EventsListenerService();
