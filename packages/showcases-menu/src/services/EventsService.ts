import { isNotDefined } from '@Engine';
import type { TEventsService } from '@Menu/models';
import type { TMenuEvent } from '@ShowcasesShared';
import { MenuEvents } from '@ShowcasesShared';
import type { Subject } from 'rxjs';

function EventsService(): TEventsService {
  let bus$: Subject<TMenuEvent> | undefined;

  const setBus = (bus: Subject<TMenuEvent>): void => void (bus$ = bus);

  function emitCloseMenu(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitCloseMenu');
    bus$.next({ type: MenuEvents.CloseMenu });
  }

  function emitStartNewGame(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitStartNewGame');
    bus$.next({ type: MenuEvents.StartNewGame });
  }

  function emitContinueGame(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitContinueGame');
    bus$.next({ type: MenuEvents.ContinueGame });
  }

  function emitLoadGame(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitLoadGame');
    bus$.next({ type: MenuEvents.LoadGame });
  }

  return { setBus, emitCloseMenu, emitStartNewGame, emitContinueGame, emitLoadGame };
}

export const eventsService: TEventsService = EventsService();
