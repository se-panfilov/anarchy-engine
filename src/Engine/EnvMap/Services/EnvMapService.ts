import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import { EnvMapLoader } from '@/Engine/EnvMap/Loader';
import type {
  TEnvMapConfig,
  TEnvMapFactory,
  TEnvMapLoader,
  TEnvMapRegistry,
  TEnvMapResourceConfig,
  TEnvMapService,
  TEnvMapServiceWithCreate,
  TEnvMapServiceWithCreateFromConfig,
  TEnvMapServiceWithFactory,
  TEnvMapServiceWithRegistry,
  TEnvMapTextureAsyncRegistry,
  TEnvMapWrapper
} from '@/Engine/EnvMap/Models';
import type { TDisposable, TWithActiveMixinResult } from '@/Engine/Mixins';
import {
  withActiveEntityServiceMixin,
  withCreateFromConfigServiceMixin,
  withCreateServiceMixin,
  withFactoryService,
  withRegistryService,
  withSceneGetterService,
  withSerializeAllEntities,
  withSerializeAllResources
} from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined } from '@/Engine/Utils';

export function EnvMapService(factory: TEnvMapFactory, registry: TEnvMapRegistry, resourcesRegistry: TEnvMapTextureAsyncRegistry, sceneW: TSceneWrapper): TEnvMapService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TEnvMapWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });

  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TEnvMapWrapper): void => registry.add(wrapper));

  const withActive: TWithActiveMixinResult<TEnvMapWrapper> = withActiveEntityServiceMixin<TEnvMapWrapper>(registry);
  const envMapLoader: TEnvMapLoader = EnvMapLoader(resourcesRegistry);

  const disposable: ReadonlyArray<TDisposable> = [registry, resourcesRegistry, factory, envMapLoader, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TEnvMapServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TEnvMapServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, { resourcesRegistry });
  const withFactory: TEnvMapServiceWithFactory = withFactoryService(factory);
  const withRegistry: TEnvMapServiceWithRegistry = withRegistryService(registry);

  withActive.active$.subscribe((wrapper: TEnvMapWrapper | undefined): void => {
    if (isDefined(wrapper)) {
      sceneW.setBackground(wrapper.entity);
      sceneW.setEnvironmentMap(wrapper.entity);
    }
  });

  const findActive = withActive.findActive;

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    withActive.active$.complete();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSceneGetterService(sceneW),
    withSerializeAllResources<TEnvMapResourceConfig, undefined>(resourcesRegistry),
    withSerializeAllEntities<TEnvMapConfig, undefined>(registry),
    {
      loadAsync: envMapLoader.loadAsync,
      loadFromConfigAsync: envMapLoader.loadFromConfigAsync,
      setActive: withActive.setActive,
      findActive,
      active$: withActive.active$,
      getResourceRegistry: (): TEnvMapTextureAsyncRegistry => resourcesRegistry
    }
  );
}
