import type { TGameKey } from '@Anarchy/Engine';
import { KeyCode, KeysExtra, MouseButtonValue } from '@Anarchy/Engine';
import { GuiActionType } from '@Showcases/GUI/constants/GuiActionType';

const { Attack, MiniMap, Defense, Settings, Inventory } = GuiActionType;

export const BUTTON_KEYS: Record<GuiActionType, TGameKey | MouseButtonValue> = {
  [Attack]: MouseButtonValue.Left,
  [Defense]: MouseButtonValue.Right,
  [Inventory]: KeyCode.I,
  [MiniMap]: KeyCode.M,
  [Settings]: KeysExtra.Escape
};
