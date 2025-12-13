import type { Subject } from 'rxjs';

import type { TWriteable } from './TypesUtils';

export function updateSubjOnChange<T extends Record<K, V>, K extends keyof T, V>(obj: T, fieldName: K, subj$: Subject<T[K]>, beforeApplyFn?: (v: T[K]) => T[K]): T {
  return new Proxy(obj, {
    set(target: TWriteable<T>, prop: string, value: T[K]): boolean {
      const val: T[K] = beforeApplyFn ? beforeApplyFn(value) : value;
      // eslint-disable-next-line functional/immutable-data
      target[prop as K] = val;
      if (fieldName === prop) subj$.next(val);
      return true;
    }
  });
}
