import type { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs';

import type { IAbstractRegistry } from '@/Engine/Abstract';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { createDeferredPromise, isDefined } from '@/Engine/Utils';

export function subscribeToValue<T extends IRegistrable | IMultitonRegistrable>(reg: IAbstractRegistry<T>, filterFn: (entity: T) => boolean, stopCb?: (stop: () => void) => void): Promise<T> {
  const { resolve, promise, reject } = createDeferredPromise<T>();

  const destroySub$: Subscription = reg.destroyed$.subscribe(() => {
    reject(undefined);
    sub$.unsubscribe();
    destroySub$.unsubscribe();
  });

  const sub$: Subscription = reg.added$.pipe(filter(filterFn)).subscribe((entity: T): void => {
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

export function subscribeToValue$<T extends IRegistrable | IMultitonRegistrable>(reg: IAbstractRegistry<T>, filterFn: (entity: T) => boolean): Observable<T> {
  return reg.added$.pipe(filter(filterFn), take(1));
}
