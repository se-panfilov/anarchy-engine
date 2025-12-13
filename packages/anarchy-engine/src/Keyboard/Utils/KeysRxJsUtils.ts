import type { TGameKey, TKeysEvent } from '@Anarchy/Engine/Keyboard';
import { isKeyInEvent } from '@Anarchy/Engine/Keyboard';
import { isKeyPressed, isKeysPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs';

export const onKeysCombo = (keys: ReadonlyArray<TGameKey>): OperatorFunction<TKeysEvent, TKeysEvent> => {
  return (source: Observable<TKeysEvent>): Observable<TKeysEvent> => source.pipe(filter((event: TKeysEvent): boolean => isKeysPressed(keys, event.keys)));
};

export const onKey = (key: TGameKey): OperatorFunction<TKeysEvent, TKeysEvent> => {
  return (source: Observable<TKeysEvent>): Observable<TKeysEvent> => source.pipe(filter((event: TKeysEvent): boolean => isKeyPressed(key, event.keys)));
};

export const onKeyReleased = (key: TGameKey): OperatorFunction<TKeysEvent, TKeysEvent> => {
  return (source: Observable<TKeysEvent>): Observable<TKeysEvent> => source.pipe(filter((event: TKeysEvent): boolean => isKeyInEvent(key, event.event) && event.released === key));
};
