import type { MouseButtonValue, TGameKey } from '@Anarchy/Engine';
import type { GuiActionType } from '@Showcases/GUI/constants';
import type { FunctionalComponent } from 'vue';

export type TGuiButtonStoreState = Readonly<{
  [key in GuiActionType]: TGuiButtonState;
}>;

export type TGuiButtonState = {
  id: GuiActionType;
  isVisible: boolean;
  isActive: boolean;
  i18n: string;
  key: TGameKey | MouseButtonValue | undefined;
  icon: FunctionalComponent;
};
