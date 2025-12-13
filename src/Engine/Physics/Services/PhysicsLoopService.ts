import type { World } from '@dimforge/rapier3d';
import { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsLoopService, TPhysicsWorldService } from '@/Engine/Physics/Models';
import { isNotDefined } from '@/Engine/Utils';

export function PhysicsLoopService(physicsWorldService: TPhysicsWorldService): TPhysicsLoopService {
  let _isAutoUpdate: boolean = true;
  const tick$: Subject<void> = new Subject<void>();

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe((): void => {
    tick$.complete();
  });

  return {
    step: (): void => {
      const world: World | undefined = physicsWorldService.getWorld();
      if (isNotDefined(world)) return;
      world.step();
    },
    tick$: tick$,
    isAutoUpdate: (): boolean => _isAutoUpdate,
    shouldAutoUpdate: (value: boolean): void => void (_isAutoUpdate = value),
    ...destroyable
  };
}
