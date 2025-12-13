import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TCollisionsLoopService, TCollisionsLoopServiceValue } from '@/Engine/Collisions/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function CollisionsLoopService(): TCollisionsLoopService {
  let _isAutoUpdate: boolean = true;
  const tick$: Subject<TCollisionsLoopServiceValue> = new Subject<TCollisionsLoopServiceValue>();

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    tick$.complete();
    tick$.unsubscribe();
  });

  return {
    tick$: tick$,
    isAutoUpdate: (): boolean => _isAutoUpdate,
    shouldAutoUpdate: (value: boolean): void => void (_isAutoUpdate = value),
    ...destroyable
  };
}
