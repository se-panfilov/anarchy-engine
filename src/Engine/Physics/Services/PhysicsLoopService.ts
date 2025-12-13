import type { World } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsLoopService, TPhysicsWorldService } from '@/Engine/Physics/Models';
import { isNotDefined } from '@/Engine/Utils';

export function PhysicsLoopService(physicsWorldService: TPhysicsWorldService): TPhysicsLoopService {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  const tick$: Subject<void> = new Subject<void>();

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    tick$.complete();
    tick$.unsubscribe();
  });

  return {
    step: (): void => {
      const world: World | undefined = physicsWorldService.getWorld();
      if (isNotDefined(world)) return;
      world.step();
    },
    tick$,
    autoUpdate$,
    ...destroyable
  };
}
