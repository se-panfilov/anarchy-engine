import type { TGameKey } from './TGameKey';
import type { TKeysCombo } from './TKeysCombo';

export type TKeyEvent = Readonly<{
  keys: TKeysCombo;
  pressed?: TGameKey;
  released?: TGameKey;
  event?: KeyboardEvent;
}>;
