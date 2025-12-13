import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TEventsListenerService } from '@Showcases/Menu/models';
import { menuPinia } from '@Showcases/Menu/stores/CreatePinia';
import { useLegalDocsStore } from '@Showcases/Menu/stores/LegalDocsStore';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TToMenuEvent } from '@Showcases/Shared';
import { isLoadDoc, isSettings, ToMenuEvents } from '@Showcases/Shared';
import type { Observable, Subscription } from 'rxjs';

function EventsListenerService(): TEventsListenerService {
  let toMenuBus$: Observable<TToMenuEvent> | undefined;

  const setToMenuBus = (bus: Observable<TToMenuEvent>): void => void (toMenuBus$ = bus);

  function startListeningAppEvents(): Subscription {
    if (isNotDefined(toMenuBus$)) throw new Error('[EventsService]: toMenuBus$ is not defined. Call setToMenuBus() first.');
    return toMenuBus$.subscribe(handleToMenuEvents);
  }

  function handleToMenuEvents(event: TToMenuEvent): void {
    switch (event.type) {
      case ToMenuEvents.SettingsReceived: {
        console.log('[EventsService]: Settings received');
        if (!isSettings(event.payload)) throw new Error(`[EventsService]: Failed to apply settings: Invalid payload`);
        //Pass menuPinia explicitly to avoid issues when pinia connects to different app instance (e.g. gui vs menu)
        useSettingsStore(menuPinia).setState(event.payload);
        break;
      }
      case ToMenuEvents.LegalDocsReceived: {
        console.log('[EventsService]: Legal docs received');
        if (!isLoadDoc(event.payload)) throw new Error(`[EventsService]: Failed to apply legal docs: Invalid payload`);
        //Pass menuPinia explicitly to avoid issues when pinia connects to different app instance (e.g. gui vs menu)
        useLegalDocsStore(menuPinia).setDoc(event.payload);
        break;
      }
      default: {
        throw new Error('[EventsService]: Unknown event type received in toMenuBus$');
      }
    }
  }

  return {
    setToMenuBus,
    startListeningAppEvents,
    toMenuBus$
  };
}

export const eventsListenerService: TEventsListenerService = EventsListenerService();
