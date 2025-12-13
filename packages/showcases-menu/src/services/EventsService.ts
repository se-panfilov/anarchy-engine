import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TEventsService } from '@Showcases/Menu/models';
import { useSettingsStore } from '@Showcases/Menu/stores/SettingsStore';
import type { TFromMenuEvent, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import { FromMenuEvents, isSettings, ToMenuEvents } from '@Showcases/Shared';
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

  function emitSaveMenuSettings(settings: TShowcaseGameSettings): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitSaveMenuSettings');
    fromMenuBus$.next({ type: FromMenuEvents.SaveSettings, payload: toRaw(settings) });
  }

  function emitLoadMenuSettings(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitLoadMenuSettings');
    fromMenuBus$.next({ type: FromMenuEvents.LoadSettings });
  }

  function emitLoadLegalDocs(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitLoadLegalDocs');
    fromMenuBus$.next({ type: FromMenuEvents.LoadLegalDocs });
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

  function startListeningAppEvents(): Subscription {
    if (isNotDefined(toMenuBus$)) throw new Error('[EventsService]: toMenuBus$ is not defined. Call setToMenuBus() first.');
    return toMenuBus$.subscribe(handleToMenuEvents);
  }

  function handleToMenuEvents(event: TToMenuEvent): void {
    switch (event.type) {
      case ToMenuEvents.SettingsLoaded: {
        console.log('[EventsService]: Settings loaded:', event.payload);
        if (!isSettings(event.payload)) throw new Error(`[EventsService]: Failed to apply settings: Invalid payload`);
        // TODO DESKTOP: languages should apply to menu immediately
        useSettingsStore().setState(event.payload);
        break;
      }
      default: {
        throw new Error('[EventsService]: Unknown event type received in toMenuBus$');
      }
    }
  }

  return {
    setFromMenuBus,
    setToMenuBus,
    emitCloseMenu,
    emitSaveMenuSettings,
    emitLoadMenuSettings,
    emitLoadLegalDocs,
    emitStartNewGame,
    emitContinueGame,
    emitLoadGame,
    startListeningAppEvents,
    toMenuBus$
  };
}

export const eventsService: TEventsService = EventsService();
