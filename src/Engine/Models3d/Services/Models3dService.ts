import type { TAnimationsService } from '@/Engine/Animations';
import type { TMaterialRegistry, TMaterialService } from '@/Engine/Material';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { Models3dLoader } from '@/Engine/Models3d/Loaders';
import type {
  TModel3d,
  TModel3dConfig,
  TModel3dParams,
  TModel3dRegistry,
  TModel3dResourceAsyncRegistry,
  TModels3dFactory,
  TModels3dLoader,
  TModels3dService,
  TModels3dServiceDependencies
} from '@/Engine/Models3d/Models';
import type { TOptional } from '@/Engine/Utils';

export function Models3dService(
  factory: TModels3dFactory,
  registry: TModel3dRegistry,
  resourcesRegistry: TModel3dResourceAsyncRegistry,
  { materialService, animationsService, model3dToModel3dFacadeConnectionRegistry }: TModels3dServiceDependencies
): TModels3dService {
  factory.entityCreated$.subscribe((wrapper: TModel3d): void => registry.add(wrapper));
  const model3dLoader: TModels3dLoader = Models3dLoader(resourcesRegistry);
  const materialRegistry: TMaterialRegistry = materialService.getRegistry();

  const create = (params: TModel3dParams): TModel3d => factory.create(params, { animationsService, model3dToModel3dFacadeConnectionRegistry });
  const createFromConfig = (models3d: ReadonlyArray<TModel3dConfig>): ReadonlyArray<TModel3d> =>
    models3d.map((config: TModel3dConfig): TModel3d => create(factory.configToParams(config, { materialRegistry, model3dResourceAsyncRegistry: resourcesRegistry })));

  function clone(model3dFacade: TModel3d, overrides?: TOptional<TModel3dParams>): TModel3d {
    const cloned = model3dFacade._clone(overrides);
    registry.add(cloned);
    return cloned;
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();
    // TODO DESTROY: We need a way to unload models3d, tho
    resourcesRegistry.destroy();
  });

  return {
    create,
    createFromConfig,
    loadAsync: model3dLoader.loadAsync,
    loadFromConfigAsync: model3dLoader.loadFromConfigAsync,
    getFactory: (): TModels3dFactory => factory,
    getRegistry: (): TModel3dRegistry => registry,
    getResourceRegistry: (): TModel3dResourceAsyncRegistry => resourcesRegistry,
    getAnimationsService: (): TAnimationsService => animationsService,
    getMaterialService: (): TMaterialService => materialService,
    clone,
    ...destroyable
  };
}
