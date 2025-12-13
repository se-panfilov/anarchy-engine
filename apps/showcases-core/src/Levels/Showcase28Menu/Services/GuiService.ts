import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TFromGuiEvent } from '@Showcases/Shared';
import { FromGuiActionEvents, FromGuiEvents } from '@Showcases/Shared';
import type { TFromGuiActionEvent, TFromGuiActionPayload } from 'showcases-gui/src/models/TFromGuiActionEvent';

import type { TGuiService, TMainMenuService } from '@/Levels/Showcase28Menu/Models';

export function GuiService(mainMenuService: TMainMenuService): TGuiService {
  function openGui(): void | never {
    const guiElement: HTMLElement | null = document.querySelector('#gui');
    if (isNotDefined(guiElement)) throw new Error(`[APP] No gui element found`);
    guiElement.classList.add('-active');
  }

  function closeGui(): void | never {
    const guiElement: HTMLElement | null = document.querySelector('#gui');
    if (isNotDefined(guiElement)) throw new Error(`[APP] No gui element found`);
    guiElement.classList.remove('-active');
  }

  function onGuiEvents(event: TFromGuiEvent | TFromGuiActionEvent): void {
    switch (event.type) {
      case FromGuiEvents.Action: {
        onGuiActionEvent((event as TFromGuiActionEvent).payload);
        break;
      }
      default:
        throw new Error(`[APP]: Unknown GUI event type "${event.type}"`);
    }
  }

  function onGuiActionEvent(payload: TFromGuiActionPayload): void {
    switch (payload.type) {
      case FromGuiActionEvents.SettingsToggle: {
        console.log('XXX mainMenuService.isMenuActive()', mainMenuService.isMenuActive());
        return mainMenuService.isMenuActive() ? mainMenuService.closeMainMenu() : mainMenuService.openMainMenu();
      }
      default:
        throw new Error(`[APP]: Unknown GUI Action Event type "${payload.type}"`);
    }
  }

  return {
    closeGui,
    onGuiActionEvent,
    onGuiEvents,
    openGui
  };
}
