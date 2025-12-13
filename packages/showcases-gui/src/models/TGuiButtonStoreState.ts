import type { KeyCode, MouseButtonValue } from '@Anarchy/Engine';
import type { GuiBottomButtons } from '@Showcases/GUI/constants';

export type TGuiButtonStoreState = Readonly<{
  [key in GuiBottomButtons]: TGuiButtonState;
}>;

export type TGuiButtonState = {
  id: string;
  isVisible: boolean;
  isActive: boolean;
  title: string;
  key: KeyCode | MouseButtonValue | undefined;
};
