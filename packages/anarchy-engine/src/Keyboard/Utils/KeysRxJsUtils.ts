import type { TGameKey, TKeyEvent } from '@Anarchy/Engine/Keyboard';
import { isKeyInEvent } from '@Anarchy/Engine/Keyboard';
import { hasKey, isKeysPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs';

export const onKeysCombo = (keys: ReadonlyArray<TGameKey>): OperatorFunction<TKeyEvent, TKeyEvent> => {
  return (source: Observable<TKeyEvent>): Observable<TKeyEvent> => source.pipe(filter((keyEvent: TKeyEvent): boolean => isKeysPressed(keys, keyEvent.keys)));
};

export const onKey = (key: TGameKey): OperatorFunction<TKeyEvent, TKeyEvent> => {
  return (source: Observable<TKeyEvent>): Observable<TKeyEvent> => source.pipe(filter((keyEvent: TKeyEvent): boolean => hasKey(key, keyEvent.keys)));
};

export const onKeyReleased = (key: TGameKey): OperatorFunction<TKeyEvent, TKeyEvent> => {
  return (source: Observable<TKeyEvent>): Observable<TKeyEvent> => source.pipe(filter((keyEvent: TKeyEvent): boolean => isKeyInEvent(key, keyEvent) && keyEvent.released === key));
};
