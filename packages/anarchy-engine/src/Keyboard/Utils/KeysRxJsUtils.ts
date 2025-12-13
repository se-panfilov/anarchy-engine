import type { TGameKey, TKeysEvent, TKeysState } from '@Anarchy/Engine/Keyboard';
import { isKeyPressed, isKeysPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs';

export const filterKeysPressed = (keys: ReadonlyArray<TGameKey>): OperatorFunction<TKeysEvent, TKeysEvent> => {
  return (source: Observable<TKeysEvent>): Observable<TKeysEvent> => source.pipe(filter((event: TKeysEvent): boolean => isKeysPressed(keys, event.keys)));
};

export const filterKeyPressed = (key: TGameKey): OperatorFunction<TKeysEvent, TKeysEvent> => {
  return (source: Observable<TKeysEvent>): Observable<TKeysEvent> => source.pipe(filter((event: TKeysEvent): boolean => isKeyPressed(key, event.keys)));
};

export const filterKeyReleased = (key: TGameKey): OperatorFunction<TKeysState, TKeysState> => {
  return (source: Observable<TKeysState>): Observable<TKeysState> => source.pipe(filter((pressed: TKeysState): boolean => !isKeyPressed(key, pressed)));
};
