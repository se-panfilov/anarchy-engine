import type { Subject } from 'rxjs';

import type { TWriteable } from './TypesUtils';

export function updateSubjOnChange<T extends Record<K, V>, K extends keyof T, V>(obj: T, fieldName: K, subj$: Subject<T[K]>): T {
  console.log(111, obj, fieldName);
  return new Proxy(obj, {
    set(target: TWriteable<T>, prop: string, value: T[K]): boolean {
      // eslint-disable-next-line functional/immutable-data
      target[prop as K] = value;
      if (fieldName === prop) subj$.next(value);
      return true;
    }
  });
}
