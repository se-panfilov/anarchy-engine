import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import type { TAudioLoop } from '@hellpig/anarchy-engine/Audio';
import type { TCollisionsLoop } from '@hellpig/anarchy-engine/Collisions';
import type { TControlsLoop } from '@hellpig/anarchy-engine/Controls';
import type { TIntersectionsLoop } from '@hellpig/anarchy-engine/Intersections';
import type { TKinematicLoop } from '@hellpig/anarchy-engine/Kinematic';
import { LoopType } from '@hellpig/anarchy-engine/Loop/Constants';
import type { TLoop, TLoopFactory, TLoopRegistry, TLoopService, TLoopServiceWithCreate, TLoopServiceWithFactory, TLoopServiceWithRegistry } from '@hellpig/anarchy-engine/Loop/Models';
import { getMainLoopNameByType } from '@hellpig/anarchy-engine/Loop/Utils';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService } from '@hellpig/anarchy-engine/Mixins';
import type { TMouseLoop } from '@hellpig/anarchy-engine/Mouse';
import type { TPhysicsLoop } from '@hellpig/anarchy-engine/Physics';
import type { TRenderLoop } from '@hellpig/anarchy-engine/Space';
import type { TSpatialLoop } from '@hellpig/anarchy-engine/Spatial';
import type { TTextLoop } from '@hellpig/anarchy-engine/Text';
import type { TTransformLoop } from '@hellpig/anarchy-engine/TransformDrive';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';

export function LoopService(factory: TLoopFactory, registry: TLoopRegistry): TLoopService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TLoop): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TLoopServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TLoopServiceWithFactory = withFactoryService(factory);
  const withRegistry: TLoopServiceWithRegistry = withRegistryService(registry);

  function getLoop(name: string | undefined, type: LoopType): TLoop {
    const searchName: string = name ?? getMainLoopNameByType(type);
    // If no name is provided, return the main loop
    // otherwise, return the loop with the specified name or throw an error
    return registry.get((loop: TLoop): boolean => loop.name === searchName);
  }

  return mergeAll(abstractService, withCreateService, withFactory, withRegistry, {
    getLoop,
    getRenderLoop: (name?: string): TRenderLoop => getLoop(name, LoopType.Render) as TRenderLoop,
    getAudioLoop: (name?: string): TAudioLoop => getLoop(name, LoopType.Audio) as TAudioLoop,
    getPhysicsLoop: (name?: string): TPhysicsLoop => getLoop(name, LoopType.Physics) as TPhysicsLoop,
    getCollisionsLoop: (name?: string): TCollisionsLoop => getLoop(name, LoopType.Collisions) as TCollisionsLoop,
    getKinematicLoop: (name?: string): TKinematicLoop => getLoop(name, LoopType.Kinematic) as TKinematicLoop,
    getSpatialLoop: (name?: string): TSpatialLoop => getLoop(name, LoopType.Spatial) as TSpatialLoop,
    getTransformLoop: (name?: string): TTransformLoop => getLoop(name, LoopType.Transform) as TTransformLoop,
    getTextLoop: (name?: string): TTextLoop => getLoop(name, LoopType.Text) as TTextLoop,
    getMouseLoop: (name?: string): TMouseLoop => getLoop(name, LoopType.Mouse) as TMouseLoop,
    getIntersectionsLoop: (name?: string): TIntersectionsLoop => getLoop(name, LoopType.Intersections) as TIntersectionsLoop,
    getControlsLoop: (name?: string): TControlsLoop => getLoop(name, LoopType.Controls) as TControlsLoop
  });
}
