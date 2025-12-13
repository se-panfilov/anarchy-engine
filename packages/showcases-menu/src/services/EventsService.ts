import type { TEventsService } from '@Menu/models';
import { isNotDefined } from '@Shared/Utils';
import type { TMenuEvent, TShowcaseGameSettings } from '@ShowcasesShared';
import { MenuEvents } from '@ShowcasesShared';
import type { Subject } from 'rxjs';
import { toRaw } from 'vue';

function EventsService(): TEventsService {
  let bus$: Subject<TMenuEvent> | undefined;

  const setBus = (bus: Subject<TMenuEvent>): void => void (bus$ = bus);

  const noBusError = '[EventsService]: bus$ is not defined. Call setBus() first.';

  function emitCloseMenu(): void | never {
    if (isNotDefined(bus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitCloseMenu');
    bus$.next({ type: MenuEvents.CloseMenu });
  }

  function emitSaveMenuSettings(settings: TShowcaseGameSettings): void | never {
    if (isNotDefined(bus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitSaveMenuSettings');
    bus$.next({ type: MenuEvents.SaveSettings, payload: toRaw(settings) });
  }

  function emitLoadMenuSettings(): void | never {
    if (isNotDefined(bus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitLoadMenuSettings');
    // TODO DESKTOP: Implement, make receive settings and apply to store
    console.warn(`[EventsService]: emitLoadMenuSettings is not implemented yet.`);
    bus$.next({ type: MenuEvents.LoadSettings });
  }

  function emitStartNewGame(): void | never {
    if (isNotDefined(bus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitStartNewGame');
    bus$.next({ type: MenuEvents.StartNewGame });
  }

  function emitContinueGame(): void | never {
    if (isNotDefined(bus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitContinueGame');
    bus$.next({ type: MenuEvents.ContinueGame });
  }

  function emitLoadGame(): void | never {
    if (isNotDefined(bus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitLoadGame');
    bus$.next({ type: MenuEvents.LoadGame });
  }

  return { setBus, emitCloseMenu, emitSaveMenuSettings, emitLoadMenuSettings, emitStartNewGame, emitContinueGame, emitLoadGame };
}

export const eventsService: TEventsService = EventsService();
