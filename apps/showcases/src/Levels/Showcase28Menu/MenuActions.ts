import { isNotDefined } from '@Engine';
import type { TGameSettings, TMenuEvent } from '@ShowcasesShared';
import { MenuEvents } from '@ShowcasesShared';
import type { Observable } from 'rxjs';

import { closeMainMenu, saveSettings } from '@/Levels/Showcase28Menu/MainMenuService';

export function handleMenuEvents(menuEventsBus$: Observable<TMenuEvent>): void {
  menuEventsBus$.subscribe((event: TMenuEvent): void => {
    switch (event.type) {
      case MenuEvents.Close: {
        closeMainMenu();
        break;
      }
      case MenuEvents.SaveSettings: {
        if (isNotDefined(event.payload)) throw new Error(`[Showcase]: No settings provided for saving`);
        //Better to validate the payload type here
        // TODO DESKTOP: this code is async, hmm... What should we do with the UI?
        saveSettings(event.payload as TGameSettings);
        break;
      }
      default: {
        console.warn(`[Showcase]: Unknown event type "${event.type}" received in menuEventsBus$`);
      }
    }
  });
}
