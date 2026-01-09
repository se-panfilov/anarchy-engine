import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type { TAnimationsResourceAsyncRegistry, TAnimationsService } from '@Anarchy/Engine/Animations';
import type { TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager';
import type { TMaterialRegistry, TMaterialService } from '@Anarchy/Engine/Material';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities, withSerializeAllResources } from '@Anarchy/Engine/Mixins';
import { Models3dLoader } from '@Anarchy/Engine/Models3d/Loaders';
import type {
  TModel3d,
  TModel3dConfig,
  TModel3dConfigToParamsDependencies,
  TModel3dParams,
  TModel3dRawToModel3dConnectionRegistry,
  TModel3dResourceConfig,
  TModel3dSerializeResourcesDependencies,
  TModel3dServiceWithCreate,
  TModel3dServiceWithCreateFromConfig,
  TModel3dServiceWithFactory,
  TModel3dServiceWithRegistry,
  TModels3dFactory,
  TModels3dLoader,
  TModels3dMetaInfoRegistry,
  TModels3dRegistry,
  TModels3dResourceAsyncRegistry,
  TModels3dService,
  TModels3dServiceDependencies
} from '@Anarchy/Engine/Models3d/Models';
import type { TSpaceSettings } from '@Anarchy/Engine/Space';
import { mergeAll } from '@Anarchy/Engine/Utils';
import type { TOptional } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';

export function Models3dService(
  factory: TModels3dFactory,
  registry: TModels3dRegistry,
  resourcesRegistry: TModels3dResourceAsyncRegistry,
  metaInfoRegistry: TModels3dMetaInfoRegistry,
  { materialService, animationsService, model3dRawToModel3dConnectionRegistry }: TModels3dServiceDependencies,
  loadingManagerWrapper: TLoadingManagerWrapper,
  settings: TSpaceSettings
): TModels3dService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((model3d: TModel3d): void => registry.add(model3d));
  const model3dLoader: TModels3dLoader = Models3dLoader(resourcesRegistry, metaInfoRegistry, loadingManagerWrapper, settings.threeJsSettings?.draco);
  const materialRegistry: TMaterialRegistry = materialService.getRegistry();
  const animationsResourceAsyncRegistry: TAnimationsResourceAsyncRegistry = animationsService.getResourceRegistry();
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, resourcesRegistry, model3dRawToModel3dConnectionRegistry, factorySub$, model3dLoader];
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
    return factory.create(
      {
        ...model3d.getParams(),
        forceClone: true,
        ...overrides
      },
      { animationsService, model3dRawToModel3dConnectionRegistry }
    );
  }

  return mergeAll(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializeAllResources<TModel3dResourceConfig, TModel3dSerializeResourcesDependencies>(resourcesRegistry, { metaInfoRegistry }),
    withSerializableEntities<TModel3d, TModel3dConfig, Pick<TModel3dConfigToParamsDependencies, 'animationsResourceAsyncRegistry' | 'model3dResourceAsyncRegistry'>>(registry, {
      animationsResourceAsyncRegistry,
      model3dResourceAsyncRegistry: resourcesRegistry
    }),
    {
      loadAsync: model3dLoader.loadAsync,
      loadFromConfigAsync: model3dLoader.loadFromConfigAsync,
      getResourceRegistry: (): TModels3dResourceAsyncRegistry => resourcesRegistry,
      getMetaInfoRegistry: (): TModels3dMetaInfoRegistry => metaInfoRegistry,
      getAnimationsService: (): TAnimationsService => animationsService,
      getMaterialService: (): TMaterialService => materialService,
      getModel3dRawToModel3dConnectionRegistry: (): TModel3dRawToModel3dConnectionRegistry => model3dRawToModel3dConnectionRegistry,
      clone
    }
  );
}
