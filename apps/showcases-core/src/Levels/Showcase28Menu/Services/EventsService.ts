import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TFromMenuEvent, TLegalDoc, TLoadDocPayload, TShowcaseGameSettings, TToMenuEvent } from '@Showcases/Shared';
import { FromMenuEvents, isLoadDocPayload, isSettings, ToMenuEvents } from '@Showcases/Shared';
import type { Observable, Subject } from 'rxjs';

import type { TEventsService, TEventsServiceDependencies } from '@/Levels/Showcase28Menu/Models';

// TODO DESKTOP: Async events here should trigger a global loader (we need to implement one)
export function EventsService({ mainMenuService, appService, settingsService }: TEventsServiceDependencies): TEventsService {
  function handleFromMenuEvents(fromMenuEventsBus$: Observable<TFromMenuEvent>, toMenuEventsBus$: Subject<TToMenuEvent>): void {
    let settings: TShowcaseGameSettings | undefined;
    let legalDocs: TLegalDoc | undefined;
    let isRestartNeeded: boolean = false;

    const { closeMainMenu, getLegalDocs, getSettings, setSettings } = mainMenuService;

    fromMenuEventsBus$.subscribe(async (event: TFromMenuEvent): Promise<void> => {
      switch (event.type) {
        case FromMenuEvents.CloseMenu: {
          closeMainMenu();
          break;
        }
        case FromMenuEvents.SetSettings: {
          if (isNotDefined(event.payload)) throw new Error(`[APP] No settings provided for saving`);
          if (!isSettings(event.payload)) throw new Error('[APP] Attempted to save invalid app settings');
          await setSettings(event.payload as TShowcaseGameSettings);
          isRestartNeeded = settingsService.applyAppSettings(event.payload);
          if (isRestartNeeded) appService.restartApp();
          break;
        }
        case FromMenuEvents.GetSettings: {
          try {
            settings = await getSettings();
          } catch (error) {
            throw new Error(`[APP] Failed to load settings: ${error}`);
          }
          if (isNotDefined(settings)) throw new Error(`[APP] Failed to load settings: ${settings}`);

          toMenuEventsBus$.next({
            type: ToMenuEvents.SettingsReceived,
            payload: settings
          });
          break;
        }
        case FromMenuEvents.GetLegalDocs: {
          if (isNotDefined(event.payload)) throw new Error(`[APP] No legal docs params provided`);
          if (!isLoadDocPayload(event.payload)) throw new Error(`[APP] payload is not valid legal docs params: ${event.payload}`);
          try {
            legalDocs = await getLegalDocs(event.payload as TLoadDocPayload);
          } catch (error) {
            throw new Error(`[APP] Failed to load legal docs: ${error}`);
          }
          if (isNotDefined(legalDocs)) throw new Error(`[APP] Failed to load legal docs: ${legalDocs}`);

          toMenuEventsBus$.next({
            type: ToMenuEvents.LegalDocsReceived,
            payload: legalDocs
          });
          break;
        }
        case FromMenuEvents.ExitApp: {
          appService.closeApp();
          break;
        }
        default: {
          console.warn(`[APP] Unknown event type "${event.type}" received in menuEventsBus$`);
        }
      }
    });
  }

  return {
    handleFromMenuEvents
  };
}
