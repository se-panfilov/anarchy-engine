import { isNotDefined } from '@Engine';
import type { TEventsService } from '@Menu/models';
import type { TMenuEvent } from '@ShowcasesShared';
import { MenuEvents } from '@ShowcasesShared';
import type { Subject } from 'rxjs';

function EventsService(): TEventsService {
  let bus$: Subject<TMenuEvent> | undefined;

  const setBus = (bus: Subject<TMenuEvent>): void => void (bus$ = bus);

  function emitClose(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitClose');
    bus$.next({ type: MenuEvents.Close });
  }

  function emitStartNew(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitStartNew');
    bus$.next({ type: MenuEvents.StartNewGame });
  }

  function emitContinue(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitContinue');
    bus$.next({ type: MenuEvents.ContinueGame });
  }

  function emitLoad(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitLoad');
    bus$.next({ type: MenuEvents.LoadGame });
  }

  return { setBus, emitClose, emitStartNew, emitContinue, emitLoad };
}

export const eventsService: TEventsService = EventsService();
