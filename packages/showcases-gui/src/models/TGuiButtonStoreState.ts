import type { KeyCode, KeysExtra, MouseButtonValue } from '@Anarchy/Engine';
import type { GuiBottomButtons } from '@Showcases/GUI/constants';
import type { FunctionalComponent } from 'vue';

export type TGuiButtonStoreState = Readonly<{
  [key in GuiBottomButtons]: TGuiButtonState;
}>;

export type TGuiButtonState = {
  id: string;
  isVisible: boolean;
  isActive: boolean;
  i18n: string;
  key: KeyCode | KeysExtra | MouseButtonValue | undefined;
  button: FunctionalComponent;
};
