import type { TGameKey } from '@hellpig/anarchy-engine';
import { KeyCode, MouseButtonValue } from '@hellpig/anarchy-engine';
import { GuiActionType } from '@Showcases/GUI/constants/GuiActionType';

const { Attack, MiniMap, Defense, Settings, Inventory, Language } = GuiActionType;

export const BUTTON_KEYS: Record<GuiActionType, TGameKey | MouseButtonValue> = {
  [Attack]: MouseButtonValue.Left,
  [Defense]: MouseButtonValue.Right,
  [Inventory]: KeyCode.I,
  [MiniMap]: KeyCode.M,
  [Language]: KeyCode.L,
  [Settings]: KeyCode.Escape
};
