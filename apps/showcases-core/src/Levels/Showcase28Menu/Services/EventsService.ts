import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TFromMenuEvent, TLegalDoc, TLoadDocPayload, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import { FromMenuEvents, isLoadDocPayload, isSettings, ToMenuEvents } from '@Showcases/Shared';
import type { Observable, Subject } from 'rxjs';

import type { TEventsService, TEventsServiceDependencies } from '@/Levels/Showcase28Menu/Models';

export function EventsService({ mainMenuService, appService, settingsService }: TEventsServiceDependencies): TEventsService {
  // TODO DESKTOP: App should react on save or load settings: E.g. language change should apply immediately (in the game).
  function handleFromMenuEvents(fromMenuEventsBus$: Observable<TFromMenuEvent>, toMenuEventsBus$: Subject<TToMenuEvent>): void {
    let settings: TShowcaseGameSettings | undefined;
    let legalDocs: TLegalDoc | undefined;
    let isRestartNeeded: boolean = false;

    const { closeMainMenu, loadLegalDocs, loadSettings, saveSettings } = mainMenuService;

    fromMenuEventsBus$.subscribe(async (event: TFromMenuEvent): Promise<void> => {
      switch (event.type) {
        case FromMenuEvents.CloseMenu: {
          closeMainMenu();
          break;
        }
        case FromMenuEvents.SaveSettings: {
          if (isNotDefined(event.payload)) throw new Error(`[Showcase]: No settings provided for saving`);
          if (!isSettings(event.payload)) throw new Error('[Showcase]: Attempted to save invalid app settings');
          //Better to validate the payload type here
          // TODO DESKTOP: this code is async, hmm... What should we do with the UI?
          await saveSettings(event.payload as TShowcaseGameSettings);
          isRestartNeeded = settingsService.applyAppSettings(event.payload);
          if (isRestartNeeded) appService.restartApp();
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
          if (!isLoadDocPayload(event.payload)) throw new Error(`[Showcase]: payload is not valid legal docs params: ${event.payload}`);
          try {
            legalDocs = await loadLegalDocs(event.payload as TLoadDocPayload);
          } catch (error) {
            throw new Error(`[Showcase]: Failed to load legal docs: ${error}`);
          }
          if (isNotDefined(legalDocs)) throw new Error(`[Showcase]: Failed to load legal docs: ${legalDocs}`);

          toMenuEventsBus$.next({
            type: ToMenuEvents.LegalDocsLoaded,
            payload: legalDocs
          });
          break;
        }
        case FromMenuEvents.ExitApp: {
          appService.closeApp();
          break;
        }
        default: {
          console.warn(`[Showcase]: Unknown event type "${event.type}" received in menuEventsBus$`);
        }
      }
    });
  }

  return {
    handleFromMenuEvents
  };
}
