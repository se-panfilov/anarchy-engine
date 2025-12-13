import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

import type { TKinematicLoopService } from '@/Engine/Kinematic/Models';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function KinematicLoopService(): TKinematicLoopService {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  const tick$: Subject<TMilliseconds> = new Subject<TMilliseconds>();

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    tick$.complete();
    tick$.unsubscribe();
  });

  return {
    tick$,
    autoUpdate$,
    ...destroyable
  };
}
