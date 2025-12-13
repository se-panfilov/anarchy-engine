import { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSpatialLoopService } from '@/Engine/Spatial/Models';

export function SpatialLoopService(): TSpatialLoopService {
  let _isAutoUpdate: boolean = true;
  const tick$: Subject<number> = new Subject<number>();

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe((): void => {
    tick$.complete();
  });

  return {
    tick$: tick$,
    isAutoUpdate: (): boolean => _isAutoUpdate,
    shouldAutoUpdate: (value: boolean): void => void (_isAutoUpdate = value),
    ...destroyable
  };
}
