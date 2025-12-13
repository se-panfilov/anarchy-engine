import type { TGameKey, TKeysState } from '@Anarchy/Engine/Keyboard';
import { isKeyPressed, isKeysPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs';

export const filterKeysPressed = (keys: ReadonlyArray<TGameKey>): OperatorFunction<TKeysState, TKeysState> => {
  return (source: Observable<TKeysState>): Observable<TKeysState> => source.pipe(filter((pressed: TKeysState): boolean => isKeysPressed(keys, pressed)));
};

export const filterKeyPressed = (key: TGameKey): OperatorFunction<TKeysState, TKeysState> => {
  return (source: Observable<TKeysState>): Observable<TKeysState> => source.pipe(filter((pressed: TKeysState): boolean => isKeyPressed(key, pressed)));
};

export const filterKeyReleased = (key: TGameKey): OperatorFunction<TKeysState, TKeysState> => {
  return (source: Observable<TKeysState>): Observable<TKeysState> => source.pipe(filter((pressed: TKeysState): boolean => !isKeyPressed(key, pressed)));
};
