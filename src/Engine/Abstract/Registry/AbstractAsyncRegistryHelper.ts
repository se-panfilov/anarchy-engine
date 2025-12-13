import type { Subscription } from 'rxjs';
import { filter } from 'rxjs';

import type { IAbstractRegistry } from '@/Engine/Abstract';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { createDeferredPromise } from '@/Engine/Utils';

export function subscribeToValue<T extends IRegistrable | IMultitonRegistrable>(reg: IAbstractRegistry<T>, filterFn: (entity: T) => boolean): { promise: Promise<T>; subscription$: Subscription } {
  const { resolve, promise, reject } = createDeferredPromise<T>();

  const destrSubscription$: Subscription = reg.destroyed$.subscribe(() => {
    reject(undefined);
    subscription$.unsubscribe();
    destrSubscription$.unsubscribe();
  });

  const subscription$: Subscription = reg.added$.pipe(filter(filterFn)).subscribe((entity: T): void => {
    resolve(entity);
    subscription$.unsubscribe();
    destrSubscription$.unsubscribe();
  });

  return { promise, subscription$ };
}
