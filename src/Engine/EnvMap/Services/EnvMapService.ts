import type { TRegistryPack } from '@/Engine/Abstract';
import { EnvMapLoader } from '@/Engine/EnvMap/Loader';
import type { TEnvMapConfig, TEnvMapFactory, TEnvMapLoader, TEnvMapParams, TEnvMapRegistry, TEnvMapService, TEnvMapTextureAsyncRegistry, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined } from '@/Engine/Utils';
import { Subscription } from 'rxjs';

export function EnvMapService(factory: TEnvMapFactory, registry: TEnvMapRegistry, resourcesRegistry: TEnvMapTextureAsyncRegistry, sceneW: TSceneWrapper): TEnvMapService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TEnvMapWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });

  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TEnvMapWrapper): void => registry.add(wrapper));

  const withActive: TWithActiveMixinResult<TEnvMapWrapper> = withActiveEntityServiceMixin<TEnvMapWrapper>(registry);
  const envMapLoader: TEnvMapLoader = EnvMapLoader(resourcesRegistry);

  const create = (params: TEnvMapParams): TEnvMapWrapper => factory.create(params);
  const createFromConfig = (envMaps: ReadonlyArray<TEnvMapConfig>): ReadonlyArray<TEnvMapWrapper> =>
    envMaps.map((config: TEnvMapConfig): TEnvMapWrapper => create(factory.configToParams(config, { resourcesRegistry })));

  withActive.active$.subscribe((wrapper: TEnvMapWrapper | undefined): void => {
    if (isDefined(wrapper)) {
      sceneW.setBackground(wrapper.entity);
      sceneW.setEnvironmentMap(wrapper.entity);
    }
  });

  const findActive = withActive.findActive;

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    registry.destroy$.next();
    // TODO DESTROY: We need a way to unload env maps, tho
    resourcesRegistry.destroy$.next();
    withActive.active$.unsubscribe();
    withActive.active$.complete();
  });

  return {
    create,
    createFromConfig,
    loadAsync: envMapLoader.loadAsync,
    loadFromConfigAsync: envMapLoader.loadFromConfigAsync,
    setActive: withActive.setActive,
    findActive,
    active$: withActive.active$.asObservable(),
    getFactory: (): TEnvMapFactory => factory,
    getRegistry: (): TEnvMapRegistry => registry,
    getResourceRegistry: (): TEnvMapTextureAsyncRegistry => resourcesRegistry,
    getScene: (): TSceneWrapper => sceneW,
    ...destroyable
  };
}
