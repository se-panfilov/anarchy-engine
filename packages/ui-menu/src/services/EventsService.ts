import { isNotDefined } from '@Engine';
import { Events } from '@Menu/constants';
import type { TEventsService, TMenuEvent } from '@Menu/models';
import type { Subject } from 'rxjs';

function EventsService(): TEventsService {
  let bus$: Subject<TMenuEvent> | undefined;

  const setBus = (bus: Subject<TMenuEvent>): void => void (bus$ = bus);

  function emitClose(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitClose');
    bus$.next({ type: Events.Close });
  }

  function emitStartNew(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitStartNew');
    bus$.next({ type: Events.StartNewGame });
  }

  function emitContinue(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitContinue');
    bus$.next({ type: Events.ContinueGame });
  }

  function emitLoad(): void | never {
    if (isNotDefined(bus$)) throw new Error('[EventsService]: bus$ is not defined. Call setBus() first.');
    console.log('[EventsService]: emitLoad');
    bus$.next({ type: Events.LoadGame });
  }

  return { setBus, emitClose, emitStartNew, emitContinue, emitLoad };
}

export const eventsService: TEventsService = EventsService();
