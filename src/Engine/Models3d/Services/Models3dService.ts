import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAnimationsResourceAsyncRegistry, TAnimationsService } from '@/Engine/Animations';
import type { TMaterialRegistry, TMaterialService } from '@/Engine/Material';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';
import { Models3dLoader } from '@/Engine/Models3d/Loaders';
import type {
  TModel3d,
  TModel3dParams,
  TModel3dServiceWithCreate,
  TModel3dServiceWithCreateFromConfig,
  TModel3dServiceWithFactory,
  TModel3dServiceWithRegistry,
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
  const factorySub$: Subscription = factory.entityCreated$.subscribe((model3d: TModel3d): void => registry.add(model3d));
  const model3dLoader: TModels3dLoader = Models3dLoader(resourcesRegistry);
  const materialRegistry: TMaterialRegistry = materialService.getRegistry();
  const animationsResourceAsyncRegistry: TAnimationsResourceAsyncRegistry = animationsService.getResourceRegistry();
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, resourcesRegistry, factorySub$, model3dLoader];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TModel3dServiceWithCreate = withCreateServiceMixin(factory, { animationsService, model3dRawToModel3dConnectionRegistry });
  const withCreateFromConfigService: TModel3dServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, {
    animationsResourceAsyncRegistry,
    materialRegistry,
    model3dResourceAsyncRegistry: resourcesRegistry
  });
  const withFactory: TModel3dServiceWithFactory = withFactoryService(factory);
  const withRegistry: TModel3dServiceWithRegistry = withRegistryService(registry);

  function clone(model3d: TModel3d, overrides?: TOptional<TModel3dParams>): TModel3d {
    const cloned: TModel3d = model3d._clone(overrides);
    registry.add(cloned);
    return cloned;
  }

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry, {
    loadAsync: model3dLoader.loadAsync,
    loadFromConfigAsync: model3dLoader.loadFromConfigAsync,
    getResourceRegistry: (): TModels3dResourceAsyncRegistry => resourcesRegistry,
    getAnimationsService: (): TAnimationsService => animationsService,
    getMaterialService: (): TMaterialService => materialService,
    clone
  });
}
