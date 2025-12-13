import type { TGameKey, TKeyEvent, TKeysCombo } from '@Anarchy/Engine/Keyboard/Models';
import { isDefined } from '@Anarchy/Shared/Utils';

export const hasKey = (key: TGameKey, keys: TKeysCombo): boolean => keys.has(key);
export const hasNoKey = (key: TGameKey, keys: TKeysCombo): boolean => !hasKey(key, keys);
export const isKeyInEvent = (key: TGameKey, event: TKeyEvent | undefined): boolean => Boolean(event && event.event?.code === key);
export const isPressEvent = (event: TKeyEvent): boolean => isDefined(event.pressed);
export const isReleaseEvent = (event: TKeyEvent): boolean => isDefined(event.released);

export function isKeysPressed(keys: ReadonlyArray<TGameKey>, pressedKeys: TKeysCombo): boolean {
  // eslint-disable-next-line functional/no-loop-statements
  for (const key of keys) {
    if (!hasKey(key, pressedKeys)) return false;
  }
  return true;
}
