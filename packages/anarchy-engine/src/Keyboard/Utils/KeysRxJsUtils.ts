import type { TGameKey } from '@Anarchy/Engine/Keyboard';
import { isKeysPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs';

export const filterKeysPressed = (keys: ReadonlyArray<TGameKey>): OperatorFunction<ReadonlySet<TGameKey>, ReadonlySet<TGameKey>> => {
  return (source: Observable<ReadonlySet<TGameKey>>): Observable<ReadonlySet<TGameKey>> => source.pipe(filter((pressed: ReadonlySet<TGameKey>): boolean => isKeysPressed(keys, pressed)));
};
