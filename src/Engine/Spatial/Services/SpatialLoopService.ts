import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSpatialLoopService, TSpatialLoopServiceValue } from '@/Engine/Spatial/Models';

export function SpatialLoopService(): TSpatialLoopService {
  let _isAutoUpdate: boolean = true;
  const tick$: Subject<TSpatialLoopServiceValue> = new Subject<TSpatialLoopServiceValue>();

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
