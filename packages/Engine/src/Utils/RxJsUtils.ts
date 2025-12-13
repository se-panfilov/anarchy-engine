import type { Observable, Subject } from 'rxjs';
import { defer, finalize } from 'rxjs';

import { isDefined, isNotDefined } from '@/Engine/Utils';

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

export function _debugTracked<T>(source$: Observable<T>, name = 'Unnamed'): Observable<T> {
  // eslint-disable-next-line functional/immutable-data
  if (isNotDefined((window as any)._subscriptionsCreated)) (window as any)._subscriptionsCreated = 0;
  // eslint-disable-next-line functional/immutable-data
  if (isNotDefined((window as any)._subscriptionsFinalized)) (window as any)._subscriptionsFinalized = 0;
  // eslint-disable-next-line functional/immutable-data
  if (isNotDefined((window as any)._subscriptionsList)) (window as any)._subscriptionsList = new Map<string, Observable<T>>();

  return defer((): Observable<T> => {
    // eslint-disable-next-line functional/immutable-data
    (window as any)._subscriptionsCreated++;
    // console.log(`[${name}] subscribed (${(window as any)._subscriptionsCreated} total)`);
    (window as any)._subscriptionsList.set(name, source$);

    return source$.pipe(
      finalize((): void => {
        // eslint-disable-next-line functional/immutable-data
        (window as any)._subscriptionsFinalized++;
        // console.log(`[${name}] finalized (${(window as any)._subscriptionsFinalized} total)`);
        (window as any)._subscriptionsList.delete(name);
      })
    );
  });
}
