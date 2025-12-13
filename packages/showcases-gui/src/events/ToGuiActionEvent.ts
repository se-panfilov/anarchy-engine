import type { GuiActionType } from '@Showcases/GUI/constants';
import type { TToGuiActionEvent } from '@Showcases/GUI/models';
import { ToGuiEvents } from '@Showcases/Shared';

export function ToGuiActionEvent(type: GuiActionType, value: boolean): TToGuiActionEvent {
  return { type: ToGuiEvents.KeyAction, payload: { type, value } };
}
