import type { TGameKey, TKeyEvent } from '@Anarchy/Engine/Keyboard';
import { isKeyInEvent } from '@Anarchy/Engine/Keyboard';
import { hasKey, isKeysPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs';

export const onKeysCombo = (keys: ReadonlyArray<TGameKey>): OperatorFunction<TKeyEvent, TKeyEvent> => {
  return (source: Observable<TKeyEvent>): Observable<TKeyEvent> => source.pipe(filter((event: TKeyEvent): boolean => isKeysPressed(keys, event.keys)));
};

export const onKey = (key: TGameKey): OperatorFunction<TKeyEvent, TKeyEvent> => {
  return (source: Observable<TKeyEvent>): Observable<TKeyEvent> => source.pipe(filter((event: TKeyEvent): boolean => hasKey(key, event.keys)));
};

export const onKeyReleased = (key: TGameKey): OperatorFunction<TKeyEvent, TKeyEvent> => {
  return (source: Observable<TKeyEvent>): Observable<TKeyEvent> => source.pipe(filter((event: TKeyEvent): boolean => isKeyInEvent(key, event) && event.released === key));
};
