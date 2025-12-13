import type { Observable, Subscription } from 'rxjs';
import { catchError, filter, take, timeout } from 'rxjs';

import type { IAbstractEntityRegistry } from '@/Engine/Abstract';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { createDeferredPromise, isDefined } from '@/Engine/Utils';

export function getValueAsync<T extends IRegistrable | IMultitonRegistrable>(
  reg: IAbstractEntityRegistry<T>,
  filterFn: (entity: T) => boolean,
  stopCb?: (stop: () => void) => void,
  waitingTime: number = 3000
): Promise<T> {
  const { resolve, promise, reject } = createDeferredPromise<T>();

  const destroySub$: Subscription = reg.destroyed$.subscribe(() => {
    reject(undefined);
    sub$.unsubscribe();
    destroySub$.unsubscribe();
  });

  const sub$: Subscription = reg.added$
    .pipe(
      timeout(waitingTime),
      catchError((error: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error?.name === 'TimeoutError') console.error('Cannot get entity async: timeout error has occurred');

        throw error;
      }),
      filter(filterFn)
    )
    .subscribe((entity: T): void => {
      resolve(entity);
      sub$.unsubscribe();
      destroySub$.unsubscribe();
    });

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
