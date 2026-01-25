import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TEventsEmitterService } from '@Showcases/Menu/models';
import type { TFromMenuEvent, TLoadDocPayload, TShowcasesGameSettings } from '@Showcases/Shared';
import { FromMenuEvents } from '@Showcases/Shared';
import type { Subject } from 'rxjs';
import { toRaw } from 'vue';

const { CloseMenu, ContinueGame, ExitApp, GetLegalDocs, GetSettings, LoadGame, SetSettings, StartNewGame } = FromMenuEvents;

function EventsEmitterService(): TEventsEmitterService {
  let fromMenuBus$: Subject<TFromMenuEvent> | undefined;

  const setFromMenuBus = (bus: Subject<TFromMenuEvent>): void => void (fromMenuBus$ = bus);

  const noBusError = '[EventsService]: fromMenuBus$ is not defined. Call setBus() first.';

  function emitCloseMenu(): void | never {
    if (isNotDefined(fromMenuBus$)) throw new Error(noBusError);
    console.log('[EventsService]: emitCloseMenu');
    fromMenuBus$.next({ type: CloseMenu });
  }

  function emitSetMenuSettings(settings: TShowcasesGameSettings): void | never {
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

  return {
    emitCloseMenu,
    emitContinueGame,
    emitExitApp,
    emitGetLegalDocs,
    emitGetMenuSettings,
    emitLoadGame,
    emitSetMenuSettings,
    emitStartNewGame,
    setFromMenuBus
  };
}

export const eventsEmitterService: TEventsEmitterService = EventsEmitterService();
