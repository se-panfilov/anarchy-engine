import { isNotDefined } from '@Anarchy/Shared/Utils';
import { GuiActionType } from '@Showcases/GUI/constants';
import type { TGuiActionPayload, TKeyActionsService } from '@Showcases/GUI/models';
import { eventsService } from '@Showcases/GUI/services/EventsService';
import { guiPinia } from '@Showcases/GUI/stores/CreatePinia';
import { useGuiButtonStore } from '@Showcases/GUI/stores/GuiButtonsStore';
import { FromGuiActionEvents, ToGuiEvents } from '@Showcases/Shared';

const { Attack, Defense, MiniMap, Settings, Inventory } = GuiActionType;
const { SettingsToggle } = FromGuiActionEvents;

export function KeyActionsService(): TKeyActionsService {
  function onAction(payload: TGuiActionPayload): void | never {
    if (isNotDefined(payload?.value) || isNotDefined(payload?.type)) throw new Error(`[EventsService]: Action "${ToGuiEvents.KeyAction}" has invalid payload`);
    setButtonVisuals(payload);
    performActions(payload);
  }

  function setButtonVisuals({ type, value }: TGuiActionPayload): void {
    //Pass guiPinia explicitly to avoid issues when pinia connects to different app instance (e.g. gui vs menu)
    useGuiButtonStore(guiPinia).setActiveButton(type, value);
  }

  function performActions({ type, value }: TGuiActionPayload): void {
    switch (type) {
      case Attack:
        // console.log('Attack', value);
        break;
      case Defense:
        // console.log('Defense', value);
        break;
      case Inventory:
        console.log('XXX Inventory', value);
        break;
      case MiniMap:
        console.log('XXX Map', value);
        break;
      case Settings:
        if (value) eventsService.emitActionEvent({ type: SettingsToggle });
        break;
      default:
        throw new Error(`[KeyActionsService]: Unknown action type "${type}"`);
    }
  }

  return {
    onAction,
    performActions
  };
}

export const keyActionsService: TKeyActionsService = KeyActionsService();
