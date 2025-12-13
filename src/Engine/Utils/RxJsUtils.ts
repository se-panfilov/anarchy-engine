import type { Subject } from 'rxjs';

import { isDefined } from '@/Engine/Utils';

import type { TWriteable } from './TypesUtils';

export function updateSubjOnChange<T extends Record<K, V>, K extends keyof T, V>(obj: T, fieldName: K, subj$: Subject<T[K]>, beforeApplyFn?: (v: T[K]) => T[K]): T {
  return new Proxy(obj, {
    set(target: TWriteable<T>, prop: string, value: T[K]): boolean {
      const isTargetField: boolean = fieldName === prop;
      const val: T[K] = isTargetField && isDefined(beforeApplyFn) ? beforeApplyFn(value) : value;
      // eslint-disable-next-line functional/immutable-data
      target[prop as K] = val;
      if (isTargetField) subj$.next(val);
      return true;
    }
  });
}
