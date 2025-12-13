import type { Subject } from 'rxjs';

import type { TWriteable } from './TypesUtils';

export function updateSubjOnChange<T extends Record<K, V>, K extends keyof T, V extends T[K]>(obj: T, subj$: Subject<V>): T {
  return new Proxy(obj, {
    set(target: TWriteable<T>, prop: string, value: V): boolean {
      // eslint-disable-next-line functional/immutable-data
      target[prop as K] = value;
      subj$.next(value);
      return true;
    }
  });
}
