import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Abstract';
import { AbstractService } from '@/Abstract';
import type { TAudioLoop } from '@/Audio';
import type { TCollisionsLoop } from '@/Collisions';
import type { TControlsLoop } from '@/Controls';
import type { TIntersectionsLoop } from '@/Intersections';
import type { TKeyboardLoop } from '@/Keyboard';
import type { TKinematicLoop } from '@/Kinematic';
import { LoopType } from '@/Loop/Constants';
import type { TLoop, TLoopFactory, TLoopRegistry, TLoopService, TLoopServiceWithCreate, TLoopServiceWithFactory, TLoopServiceWithRegistry } from '@/Loop/Models';
import { getMainLoopNameByType } from '@/Loop/Utils';
import type { TDisposable } from '@/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Mixins';
import type { TMouseLoop } from '@/Mouse';
import type { TPhysicsLoop } from '@/Physics';
import type { TRenderLoop } from '@/Space';
import type { TSpatialLoop } from '@/Spatial';
import type { TTextLoop } from '@/Text';
import type { TTransformLoop } from '@/TransformDrive';
import { mergeAll } from '@/Utils';

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
    getKeyboardLoop: (name?: string): TKeyboardLoop => getLoop(name, LoopType.Keyboard) as TKeyboardLoop,
    getMouseLoop: (name?: string): TMouseLoop => getLoop(name, LoopType.Mouse) as TMouseLoop,
    getIntersectionsLoop: (name?: string): TIntersectionsLoop => getLoop(name, LoopType.Intersections) as TIntersectionsLoop,
    getControlsLoop: (name?: string): TControlsLoop => getLoop(name, LoopType.Controls) as TControlsLoop
  });
}
