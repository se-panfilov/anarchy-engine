import { GuiActionType } from '@Showcases/GUI/constants/GuiActionType';
import { nanoid } from 'nanoid';

const { Attack, Map, Defense, Settings, Inventory } = GuiActionType;

export const BUTTON_IDS: Record<GuiActionType, string> = {
  [Attack]: nanoid(),
  [Defense]: nanoid(),
  [Inventory]: nanoid(),
  [Map]: nanoid(),
  [Settings]: nanoid()
};
