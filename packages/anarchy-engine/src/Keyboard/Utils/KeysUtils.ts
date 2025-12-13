import type { TGameKey } from '@Anarchy/Engine/Keyboard/Models';

export const isKeyPressed = (key: TGameKey, pressedKeys: ReadonlySet<TGameKey>): boolean => pressedKeys.has(key);

export function isKeysPressed(keys: ReadonlyArray<TGameKey>, pressedKeys: ReadonlySet<TGameKey>): boolean {
  // eslint-disable-next-line functional/no-loop-statements
  for (const key of keys) {
    if (!isKeyPressed(key, pressedKeys)) return false;
  }
  return true;
}
