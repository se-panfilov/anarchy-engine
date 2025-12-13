import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TFromMenuEvent, TLoadDocPayload, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import { FromMenuEvents, isLoadDocPayload, isSettings, ToMenuEvents } from '@Showcases/Shared';
import type { Observable, Subject } from 'rxjs';

import { closeMainMenu, loadLegalDocs, loadSettings, saveSettings } from '@/Levels/Showcase28Menu/MainMenuService';

// TODO DESKTOP: App should react on save or load settings: E.g. language change should apply immediately (in the game).
export function handleFromMenuEvents(fromMenuEventsBus$: Observable<TFromMenuEvent>, toMenuEventsBus$: Subject<TToMenuEvent>): void {
  let settings: TShowcaseGameSettings | undefined;
  let legalDocs: string | undefined;

  fromMenuEventsBus$.subscribe(async (event: TFromMenuEvent): Promise<void> => {
    switch (event.type) {
      case FromMenuEvents.CloseMenu: {
        closeMainMenu();
        break;
      }
      case FromMenuEvents.SaveSettings: {
        if (isNotDefined(event.payload)) throw new Error(`[Showcase]: No settings provided for saving`);
        if (isSettings(event.payload)) throw new Error(`[Showcase]: payload is not valid settings: ${event.payload}`);
        //Better to validate the payload type here
        // TODO DESKTOP: this code is async, hmm... What should we do with the UI?
        saveSettings(event.payload as TShowcaseGameSettings);
        break;
      }
      case FromMenuEvents.LoadSettings: {
        // TODO DESKTOP: this code is async, hmm... What should we do with the UI?
        try {
          settings = await loadSettings();
        } catch (error) {
          throw new Error(`[Showcase]: Failed to load settings: ${error}`);
        }
        if (isNotDefined(settings)) throw new Error(`[Showcase]: Failed to load settings: ${settings}`);

        toMenuEventsBus$.next({
          type: ToMenuEvents.SettingsLoaded,
          payload: settings
        });
        break;
      }
      case FromMenuEvents.LoadLegalDocs: {
        // TODO DESKTOP: this code is async, hmm... What should we do with the UI?

        if (isNotDefined(event.payload)) throw new Error(`[Showcase]: No legal docs params provided`);
        if (isLoadDocPayload(event.payload)) throw new Error(`[Showcase]: payload is not valid legal docs params: ${event.payload}`);
        try {
          legalDocs = await loadLegalDocs(event.payload as TLoadDocPayload);
        } catch (error) {
          throw new Error(`[Showcase]: Failed to load legal docs: ${error}`);
        }
        if (isNotDefined(legalDocs)) throw new Error(`[Showcase]: Failed to load  legal docs: ${legalDocs}`);

        toMenuEventsBus$.next({
          type: ToMenuEvents.SettingsLoaded,
          payload: { legal: legalDocs }
        });
        break;
      }
      default: {
        console.warn(`[Showcase]: Unknown event type "${event.type}" received in menuEventsBus$`);
      }
    }
  });
}
