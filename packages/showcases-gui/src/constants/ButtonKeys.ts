import type { TGameKey } from '@Anarchy/Engine';
import { KeyCode, KeysExtra, MouseButtonValue } from '@Anarchy/Engine';
import { GuiActionType } from '@Showcases/GUI/constants/GuiActionType';

const { Attack, Map, Defense, Settings, Inventory } = GuiActionType;

export const BUTTON_KEYS: Record<GuiActionType, TGameKey | MouseButtonValue> = {
  [Attack]: MouseButtonValue.Left,
  [Defense]: MouseButtonValue.Right,
  [Inventory]: KeyCode.I,
  [Map]: KeyCode.M,
  [Settings]: KeysExtra.Escape
};
