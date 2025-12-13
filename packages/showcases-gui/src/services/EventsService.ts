import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { GuiActionType } from '@Showcases/GUI/constants';
import type { TEventsService, TToGuiActionEvent } from '@Showcases/GUI/models';
import { guiPinia } from '@Showcases/GUI/stores/CreatePinia';
import { useGuiButtonStore } from '@Showcases/GUI/stores/GuiButtonsStore';
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

  function emitCloseGui(): void | never {
    if (isNotDefined(fromGuiBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitCloseGui');
    fromGuiBus$.next({ type: CloseGui });
  }

  function startListeningAppEvents(): Subscription {
    if (isNotDefined(toGuiBus$)) throw new Error('[EventsService]: toGuiBus$ is not defined. Call setToGuiBus() first.');
    return toGuiBus$.subscribe(handleToGuiEvents);
  }

  function handleToGuiEvents(event: TToGuiEvent | TToGuiActionEvent): void {
    switch (event.type) {
      case ToGuiEvents.KeyAction: {
        if (isNotDefined(event.payload?.value)) throw new Error(`[EventsService]: Action "${ToGuiEvents.KeyAction}" has no payload "value"`);
        if (isNotDefined(event.payload?.type)) throw new Error(`[EventsService]: Action "${ToGuiEvents.KeyAction}" has no payload "type"`);
        //Pass guiPinia explicitly to avoid issues when pinia connects to different app instance (e.g. gui vs menu)
        useGuiButtonStore(guiPinia).setActiveButton(event.payload.type as GuiActionType, event.payload.value as boolean);
        break;
      }
      default: {
        throw new Error('[EventsService]: Unknown event type received in toGuiBus$');
      }
    }
  }

  return {
    emitCloseGui,
    setFromGuiBus,
    setToGuiBus,
    startListeningAppEvents,
    toGuiBus$
  };
}

export const eventsService: TEventsService = EventsService();
