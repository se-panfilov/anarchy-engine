import type { GuiActionType } from '@Showcases/GUI/constants';
import type { TToGuiEvent } from '@Showcases/Shared';

export type TToGuiActionEvent = Omit<TToGuiEvent, 'payload'> &
  Readonly<{
    payload: TGuiActionPayload;
  }>;

export type TGuiActionPayload = Readonly<{
  type: GuiActionType;
  value: boolean;
}>;
