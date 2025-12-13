import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TEventsService } from '@Showcases/Menu/models';
import { menuPinia } from '@Showcases/Menu/stores/CreatePinia';
import { useLegalDocsStore } from '@Showcases/Menu/stores/LegalDocsStore';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TFromMenuEvent, TLoadDocPayload, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import { FromMenuEvents, isLoadDoc, isSettings, ToMenuEvents } from '@Showcases/Shared';
import type { Observable, Subject, Subscription } from 'rxjs';
import { toRaw } from 'vue';

const { CloseMenu, ContinueGame, ExitApp, GetLegalDocs, GetSettings, LoadGame, SetSettings, StartNewGame } = FromMenuEvents;

function EventsService(): TEventsService {
  let fromMenuBus$: Subject<TFromMenuEvent> | undefined;
  let toMenuBus$: Observable<TToMenuEvent> | undefined;

  const setFromMenuBus = (bus: Subject<TFromMenuEvent>): void => void (fromMenuBus$ = bus);
  const setToMenuBus = (bus: Observable<TToMenuEvent>): void => void (toMenuBus$ = bus);

  const noBusError = '[EventsService]: fromMenuBus$ is not defined. Call setBus() first.';

  function emitCloseMenu(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitCloseMenu');
    fromMenuBus$.next({ type: CloseMenu });
  }

  function emitSetMenuSettings(settings: TShowcaseGameSettings): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitSetMenuSettings');
    fromMenuBus$.next({ type: SetSettings, payload: toRaw(settings) });
  }

  function emitGetMenuSettings(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitGetMenuSettings');
    fromMenuBus$.next({ type: GetSettings });
  }

  function emitGetLegalDocs(payload: TLoadDocPayload): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitGetLegalDocs');
    fromMenuBus$.next({ type: GetLegalDocs, payload: toRaw(payload) });
  }

  function emitStartNewGame(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitStartNewGame');
    fromMenuBus$.next({ type: StartNewGame });
  }

  function emitContinueGame(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitContinueGame');
    fromMenuBus$.next({ type: ContinueGame });
  }

  function emitLoadGame(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitLoadGame');
    fromMenuBus$.next({ type: LoadGame });
  }

  function emitExitApp(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitExitApp');
    fromMenuBus$.next({ type: ExitApp });
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
