import type { Observable, Subscription } from 'rxjs';
import { catchError, filter, of, take, timeout } from 'rxjs';

import type { IAbstractEntityRegistry } from '@/Engine/Abstract/Models';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { createDeferredPromise, isDefined } from '@/Engine/Utils';

export function getValueAsync<T extends IRegistrable | IMultitonRegistrable>(
  reg: IAbstractEntityRegistry<T>,
  filterFn: (entity: T) => boolean,
  stopCb?: (stop: () => void) => void,
  // TODO (S.Panfilov) this time should be bigger and different for different entities
  waitingTime: number = 3000
): Promise<T | undefined> {
  const { resolve, promise, reject } = createDeferredPromise<T | undefined>();

  const sub$: Subscription = reg.added$
    .pipe(
      filter(filterFn),
      take(1),
      // TODO (S.Panfilov) I'm not sure, that timeout is a good idea here. (maybe it's better to use some kind of retry mechanism, or something)
      timeout(waitingTime),
      catchError((error: any) => {
        // TODO (S.Panfilov) instead of console should be forwarded to some kind of logger
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error?.name === 'TimeoutError') console.error(`Cannot get entity async from registry ("${reg.id}"): timeout error has occurred`);
        else console.error(`Cannot get entity async from registry ("${reg.id}"): unknown error has occurred`);
        return of(undefined);
      })
    )
    .subscribe(resolve);

  const result: T | undefined = reg.find(filterFn);
  if (isDefined(result)) {
    resolve(result);
    return promise;
  }

  const destroySub$: Subscription = reg.destroyed$.subscribe(stop);

  function stop(): void {
    reject();
    sub$.unsubscribe();
    destroySub$.unsubscribe();
  }

  if (isDefined(stopCb)) stopCb(stop);

  return promise;
}

export function subscribeToValue$<T extends IRegistrable | IMultitonRegistrable>(reg: IAbstractEntityRegistry<T>, filterFn: (entity: T) => boolean): Observable<T> {
  return reg.added$.pipe(filter(filterFn), take(1));
}
