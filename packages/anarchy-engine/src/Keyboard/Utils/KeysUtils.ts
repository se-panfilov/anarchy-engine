import type { TGameKey, TKeyEvent, TKeysCombo } from '@Anarchy/Engine/Keyboard/Models';
import { isDefined } from '@Anarchy/Shared/Utils';

export const hasKey = (key: TGameKey, keys: TKeysCombo): boolean => keys.has(key);
export const hasNoKey = (key: TGameKey, keys: TKeysCombo): boolean => !hasKey(key, keys);
export const isKeyInEvent = (key: TGameKey, keyEvent: TKeyEvent | undefined): boolean => Boolean(keyEvent && keyEvent.event?.code === key);
export const isPressEvent = (keyEvent: TKeyEvent): boolean => isDefined(keyEvent.pressed);
export const isReleaseEvent = (keyEvent: TKeyEvent): boolean => isDefined(keyEvent.released);

export function hasKeys(keys: ReadonlyArray<TGameKey>, pressedKeys: TKeysCombo): boolean {
  // eslint-disable-next-line functional/no-loop-statements
  for (const key of keys) {
    if (!hasKey(key, pressedKeys)) return false;
  }
  return true;
}
