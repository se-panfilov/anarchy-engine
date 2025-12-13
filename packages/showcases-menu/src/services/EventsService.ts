import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TEventsService } from '@Showcases/Menu/models';
import { useLegalDocsStore } from '@Showcases/Menu/stores/LegalDocsStore';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TFromMenuEvent, TLoadDocPayload, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import { FromMenuEvents, isLoadDoc, isSettings, ToMenuEvents } from '@Showcases/Shared';
import type { Observable, Subject, Subscription } from 'rxjs';
import { toRaw } from 'vue';

function EventsService(): TEventsService {
  let fromMenuBus$: Subject<TFromMenuEvent> | undefined;
  let toMenuBus$: Observable<TToMenuEvent> | undefined;

  const setFromMenuBus = (bus: Subject<TFromMenuEvent>): void => void (fromMenuBus$ = bus);
  const setToMenuBus = (bus: Observable<TToMenuEvent>): void => void (toMenuBus$ = bus);

  const noBusError = '[EventsService]: fromMenuBus$ is not defined. Call setBus() first.';

  function emitCloseMenu(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitCloseMenu');
    fromMenuBus$.next({ type: FromMenuEvents.CloseMenu });
  }

  function emitSetMenuSettings(settings: TShowcaseGameSettings): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitSetMenuSettings');
    fromMenuBus$.next({ type: FromMenuEvents.SetSettings, payload: toRaw(settings) });
  }

  function emitGetMenuSettings(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitGetMenuSettings');
    fromMenuBus$.next({ type: FromMenuEvents.GetSettings });
  }

  function emitGetLegalDocs(payload: TLoadDocPayload): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitGetLegalDocs');
    fromMenuBus$.next({ type: FromMenuEvents.GetLegalDocs, payload: toRaw(payload) });
  }

  function emitStartNewGame(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitStartNewGame');
    fromMenuBus$.next({ type: FromMenuEvents.StartNewGame });
  }

  function emitContinueGame(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitContinueGame');
    fromMenuBus$.next({ type: FromMenuEvents.ContinueGame });
  }

  function emitLoadGame(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitLoadGame');
    fromMenuBus$.next({ type: FromMenuEvents.LoadGame });
  }

  function emitExitApp(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitExitApp');
    fromMenuBus$.next({ type: FromMenuEvents.ExitApp });
  }

  function startListeningAppEvents(): Subscription {
    if (isNotDefined(toMenuBus$)) throw new Error('[EventsService]: toMenuBus$ is not defined. Call setToMenuBus() first.');
    return toMenuBus$.subscribe(handleToMenuEvents);
  }

  function handleToMenuEvents(event: TToMenuEvent): void {
    switch (event.type) {
      case ToMenuEvents.SettingsReceived: {
        console.log('[EventsService]: Settings received');
        if (!isSettings(event.payload)) throw new Error(`[EventsService]: Failed to apply settings: Invalid payload`);
        useSettingsStore().setState(event.payload);
        break;
      }
      case ToMenuEvents.LegalDocsReceived: {
        console.log('[EventsService]: Legal docs received');
        if (!isLoadDoc(event.payload)) throw new Error(`[EventsService]: Failed to apply legal docs: Invalid payload`);
        useLegalDocsStore().setDoc(event.payload);
        break;
      }
      default: {
        throw new Error('[EventsService]: Unknown event type received in toMenuBus$');
      }
    }
  }

  return {
    emitCloseMenu,
    emitContinueGame,
    emitExitApp,
    emitGetLegalDocs,
    emitGetMenuSettings,
    emitLoadGame,
    emitSetMenuSettings,
    emitStartNewGame,
    setFromMenuBus,
    setToMenuBus,
    startListeningAppEvents,
    toMenuBus$
  };
}

export const eventsService: TEventsService = EventsService();
