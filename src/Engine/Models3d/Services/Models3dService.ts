import type { Subscription } from 'rxjs';

import type { TAnimationsResourceAsyncRegistry, TAnimationsService } from '@/Engine/Animations';
import type { TMaterialRegistry, TMaterialService } from '@/Engine/Material';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { Models3dLoader } from '@/Engine/Models3d/Loaders';
import type {
  TModel3d,
  TModel3dConfig,
  TModel3dParams,
  TModels3dFactory,
  TModels3dLoader,
  TModels3dRegistry,
  TModels3dResourceAsyncRegistry,
  TModels3dService,
  TModels3dServiceDependencies
} from '@/Engine/Models3d/Models';
import type { TOptional } from '@/Engine/Utils';

export function Models3dService(
  factory: TModels3dFactory,
  registry: TModels3dRegistry,
  resourcesRegistry: TModels3dResourceAsyncRegistry,
  { materialService, animationsService, model3dRawToModel3dConnectionRegistry }: TModels3dServiceDependencies
): TModels3dService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TModel3d): void => registry.add(wrapper));
  const model3dLoader: TModels3dLoader = Models3dLoader(resourcesRegistry);
  const materialRegistry: TMaterialRegistry = materialService.getRegistry();
  const animationsResourceAsyncRegistry: TAnimationsResourceAsyncRegistry = animationsService.getResourceRegistry();

  const create = (params: TModel3dParams): TModel3d => factory.create(params, { animationsService, model3dRawToModel3dConnectionRegistry });
  const createFromConfig = (models3d: ReadonlyArray<TModel3dConfig>): ReadonlyArray<TModel3d> =>
    models3d.map((config: TModel3dConfig): TModel3d => create(factory.configToParams(config, { animationsResourceAsyncRegistry, materialRegistry, model3dResourceAsyncRegistry: resourcesRegistry })));

  function clone(model3d: TModel3d, overrides?: TOptional<TModel3dParams>): TModel3d {
    const cloned: TModel3d = model3d._clone(overrides);
    registry.add(cloned);
    return cloned;
  }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    registry.destroy$.next();
    // TODO DESTROY: We need a way to unload models3d, tho
    resourcesRegistry.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    loadAsync: model3dLoader.loadAsync,
    loadFromConfigAsync: model3dLoader.loadFromConfigAsync,
    getFactory: (): TModels3dFactory => factory,
    getRegistry: (): TModels3dRegistry => registry,
    getResourceRegistry: (): TModels3dResourceAsyncRegistry => resourcesRegistry,
    getAnimationsService: (): TAnimationsService => animationsService,
    getMaterialService: (): TMaterialService => materialService,
    clone,
    ...destroyable
  };
}
