import type { TGameKey, TKeysEvent, TKeysState } from '@Anarchy/Engine/Keyboard/Models';
import { isDefined } from '@Anarchy/Shared/Utils';

export const hasKey = (key: TGameKey, keys: TKeysState): boolean => keys.has(key);
export const hasNoKey = (key: TGameKey, keys: TKeysState): boolean => !hasKey(key, keys);
export const isKeyInEvent = (key: TGameKey, event: TKeysEvent | undefined): boolean => Boolean(event && event.event?.code === key);
export const isPressEvent = (event: TKeysEvent): boolean => isDefined(event.pressed);
export const isReleaseEvent = (event: TKeysEvent): boolean => isDefined(event.released);

export function isKeysPressed(keys: ReadonlyArray<TGameKey>, pressedKeys: TKeysState): boolean {
  // eslint-disable-next-line functional/no-loop-statements
  for (const key of keys) {
    if (!hasKey(key, pressedKeys)) return false;
  }
  return true;
}
