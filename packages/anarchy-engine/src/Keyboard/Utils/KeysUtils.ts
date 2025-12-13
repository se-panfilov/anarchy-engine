import type { TGameKey, TKeysState } from '@Anarchy/Engine/Keyboard/Models';

export const isKeyPressed = (key: TGameKey, keys: TKeysState): boolean => keys.has(key);
export const isKeyReleased = (key: TGameKey, keys: TKeysState): boolean => !isKeyPressed(key, keys);
export const isKeyInEvent = (key: TGameKey, event: KeyboardEvent | undefined): boolean => Boolean(event && event.code === key);

export function isKeysPressed(keys: ReadonlyArray<TGameKey>, pressedKeys: TKeysState): boolean {
  // eslint-disable-next-line functional/no-loop-statements
  for (const key of keys) {
    if (!isKeyPressed(key, pressedKeys)) return false;
  }
  return true;
}
