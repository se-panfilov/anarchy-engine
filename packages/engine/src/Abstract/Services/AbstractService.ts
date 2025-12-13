import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Abstract/Models';
import type { TDestroyable, TDisposable } from '@/Mixins';
import { destroyableMixin } from '@/Mixins';

export function AbstractService<T extends TDisposable>(disposable?: ReadonlyArray<T>): TAbstractService {
  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    disposable?.forEach((d: T): void => {
      if ((d as TDestroyable).destroy$) (d as TDestroyable).destroy$.next();
      if ((d as Subscription).unsubscribe) (d as Subscription).unsubscribe();
    });
  });

  return destroyable;
}
