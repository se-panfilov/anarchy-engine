import { Subject } from 'rxjs';

import type { TKinematicLoopService } from '@/Engine/Kinematic/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function KinematicLoopService(): TKinematicLoopService {
  let _isAutoUpdate: boolean = true;
  const tick$: Subject<number> = new Subject<number>();

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
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
