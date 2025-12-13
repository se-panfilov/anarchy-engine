import type { Subscription } from 'rxjs';

import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import { LoopType } from '@/Engine/Loop/Constants';
import type { TLoop, TLoopFactory, TLoopParams, TLoopRegistry, TLoopService, TLoopWithPriority } from '@/Engine/Loop/Models';
import { getMainLoopNameByType } from '@/Engine/Loop/Utils';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TRenderLoop } from '@/Engine/Space';
import type { SpaceMainLoopNames } from '@/Engine/Space/Constants';
import type { TSpatialLoop } from '@/Engine/Spatial';
import type { TTransformLoop } from '@/Engine/TransformDrive';
import { isNotDefined } from '@/Engine/Utils';

export function LoopService(factory: TLoopFactory, registry: TLoopRegistry): TLoopService {
  let debugInfoSub$: Subscription | undefined;
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TLoop | TLoopWithPriority): void => registry.add(wrapper));
  const create = (params: TLoopParams): TLoop | TLoopWithPriority => factory.create(params);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    debugInfoSub$?.unsubscribe();
    destroySub$.unsubscribe();

    factorySub$.unsubscribe();
  });

  function getLoop(name: string | SpaceMainLoopNames | undefined, type: LoopType): TLoop | TLoopWithPriority | never {
    const searchName: string = name ?? getMainLoopNameByType(type);
    const loop: TLoop | TLoopWithPriority | undefined = registry.find((loop: TLoop): boolean => loop.name === searchName);
    // If no name is provided, return the main loop
    // otherwise, return the loop with the specified name or throw an error
    if (isNotDefined(loop)) throw new Error(`LoopService: No loop with name "${name}" found`);

    return loop;
  }

  return {
    create,
    getLoop,
    getCollisionsLoop: (name?: string): TCollisionsLoop | never => getLoop(name, LoopType.Collisions) as TCollisionsLoop,
    getKinematicLoop: (name?: string): TKinematicLoop | never => getLoop(name, LoopType.Kinematic) as TKinematicLoop,
    getPhysicalLoop: (name?: string): TPhysicalLoop | never => getLoop(name, LoopType.Physical) as TPhysicalLoop,
    getRenderLoop: (name?: string): TRenderLoop | never => getLoop(name, LoopType.Render) as TRenderLoop,
    getSpatialLoop: (name?: string): TSpatialLoop | never => getLoop(name, LoopType.Spatial) as TSpatialLoop,
    getTransformLoop: (name?: string): TTransformLoop | never => getLoop(name, LoopType.Transform) as TTransformLoop,
    getFactory: (): TLoopFactory => factory,
    getRegistry: (): TLoopRegistry => registry,
    ...destroyable
  };
}
