import type { TGameKey } from './TGameKey';
import type { TKeysState } from './TKeysState';

export type TKeysEvent = Readonly<{
  keys: TKeysState;
  pressed?: TGameKey;
  released?: TGameKey;
  event?: KeyboardEvent;
}>;
