import type { TGameKey, TKeysPressingEvent } from '@Anarchy/Engine/Keyboard';
import { isKeyPressed, isKeysPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs';

export const filterKeysPressed = (keys: ReadonlyArray<TGameKey>): OperatorFunction<ReadonlySet<TGameKey>, ReadonlySet<TGameKey>> => {
  return (source: Observable<ReadonlySet<TGameKey>>): Observable<ReadonlySet<TGameKey>> => source.pipe(filter((pressed: ReadonlySet<TGameKey>): boolean => isKeysPressed(keys, pressed)));
};

export const filterKeyPressed = (key: TGameKey): OperatorFunction<ReadonlySet<TGameKey>, ReadonlySet<TGameKey>> => {
  return (source: Observable<ReadonlySet<TGameKey>>): Observable<ReadonlySet<TGameKey>> => source.pipe(filter((pressed: ReadonlySet<TGameKey>): boolean => isKeyPressed(key, pressed)));
};

export const filterKeysPressing = (expectedKeys: ReadonlyArray<TGameKey>): OperatorFunction<TKeysPressingEvent, TKeysPressingEvent> => {
  return (source: Observable<TKeysPressingEvent>): Observable<TKeysPressingEvent> => source.pipe(filter(({ keys }: TKeysPressingEvent): boolean => isKeysPressed(expectedKeys, keys)));
};

export const filterKeyPressing = (key: TGameKey): OperatorFunction<TKeysPressingEvent, TKeysPressingEvent> => {
  return (source: Observable<TKeysPressingEvent>): Observable<TKeysPressingEvent> => source.pipe(filter(({ keys }: TKeysPressingEvent): boolean => isKeyPressed(key, keys)));
};

export const filterKeyReleased = (key: TGameKey): OperatorFunction<ReadonlySet<TGameKey>, ReadonlySet<TGameKey>> => {
  return (source: Observable<ReadonlySet<TGameKey>>): Observable<ReadonlySet<TGameKey>> => source.pipe(filter((pressed: ReadonlySet<TGameKey>): boolean => !isKeyPressed(key, pressed)));
};
