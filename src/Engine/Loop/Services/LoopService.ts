import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAudioLoop } from '@/Engine/Audio';
import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TControlsLoop } from '@/Engine/Controls';
import type { TIntersectionsLoop } from '@/Engine/Intersections';
import type { TKeyboardLoop } from '@/Engine/Keyboard';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import { LoopType } from '@/Engine/Loop/Constants';
import type { TLoop, TLoopFactory, TLoopRegistry, TLoopService, TLoopServiceWithCreate, TLoopServiceWithFactory, TLoopServiceWithRegistry } from '@/Engine/Loop/Models';
import { getMainLoopNameByType } from '@/Engine/Loop/Utils';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';
import type { TMouseLoop } from '@/Engine/Mouse';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TRenderLoop } from '@/Engine/Space';
import type { TSpatialLoop } from '@/Engine/Spatial';
import type { TTextLoop } from '@/Engine/Text';
import type { TTransformLoop } from '@/Engine/TransformDrive';
import { isNotDefined } from '@/Engine/Utils';

export function LoopService(factory: TLoopFactory, registry: TLoopRegistry): TLoopService {
  let debugInfoSub$: Subscription | undefined;
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TLoop): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TLoopServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TLoopServiceWithFactory = withFactoryService(factory);
  const withRegistry: TLoopServiceWithRegistry = withRegistryService(registry);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    debugInfoSub$?.unsubscribe();
    destroySub$.unsubscribe();
  });

  function getLoop(name: string | undefined, type: LoopType): TLoop | never {
    const searchName: string = name ?? getMainLoopNameByType(type);
    const loop: TLoop | undefined = registry.find((loop: TLoop): boolean => loop.name === searchName);
    // If no name is provided, return the main loop
    // otherwise, return the loop with the specified name or throw an error
    if (isNotDefined(loop)) throw new Error(`LoopService: No loop with name "${name}" found`);

    return loop;
  }

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withFactory, withRegistry, {
    getLoop,
    getRenderLoop: (name?: string): TRenderLoop | never => getLoop(name, LoopType.Render) as TRenderLoop,
    getAudioLoop: (name?: string): TAudioLoop | never => getLoop(name, LoopType.Audio) as TAudioLoop,
    getPhysicalLoop: (name?: string): TPhysicalLoop | never => getLoop(name, LoopType.Physical) as TPhysicalLoop,
    getCollisionsLoop: (name?: string): TCollisionsLoop | never => getLoop(name, LoopType.Collisions) as TCollisionsLoop,
    getKinematicLoop: (name?: string): TKinematicLoop | never => getLoop(name, LoopType.Kinematic) as TKinematicLoop,
    getSpatialLoop: (name?: string): TSpatialLoop | never => getLoop(name, LoopType.Spatial) as TSpatialLoop,
    getTransformLoop: (name?: string): TTransformLoop | never => getLoop(name, LoopType.Transform) as TTransformLoop,
    getTextLoop: (name?: string): TTextLoop | never => getLoop(name, LoopType.Text) as TTextLoop,
    getKeyboardLoop: (name?: string): TKeyboardLoop | never => getLoop(name, LoopType.Keyboard) as TKeyboardLoop,
    getMouseLoop: (name?: string): TMouseLoop | never => getLoop(name, LoopType.Mouse) as TMouseLoop,
    getIntersectionsLoop: (name?: string): TIntersectionsLoop | never => getLoop(name, LoopType.Intersections) as TIntersectionsLoop,
    getControlsLoop: (name?: string): TControlsLoop | never => getLoop(name, LoopType.Controls) as TControlsLoop
  });
}
