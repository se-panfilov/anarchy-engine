import { EnvMapLoader } from '@/Engine/EnvMap/Loader';
import type { TEnvMapConfig, TEnvMapFactory, TEnvMapLoader, TEnvMapParams, TEnvMapRegistry, TEnvMapService, TEnvMapTextureAsyncRegistry, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined } from '@/Engine/Utils';

export function EnvMapService(factory: TEnvMapFactory, registry: TEnvMapRegistry, resourcesRegistry: TEnvMapTextureAsyncRegistry, sceneW: TSceneWrapper): TEnvMapService {
  registry.added$.subscribe((wrapper: TEnvMapWrapper): void => {
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });

  factory.entityCreated$.subscribe((wrapper: TEnvMapWrapper): void => registry.add(wrapper));

  const withActive: TWithActiveMixinResult<TEnvMapWrapper> = withActiveEntityServiceMixin<TEnvMapWrapper>(registry);
  const envMapLoader: TEnvMapLoader = EnvMapLoader(resourcesRegistry);

  const create = (params: TEnvMapParams): TEnvMapWrapper => factory.create(params, { resourcesRegistry });
  const createFromConfig = (envMaps: ReadonlyArray<TEnvMapConfig>): void => {
    envMaps.forEach((config: TEnvMapConfig): TEnvMapWrapper => factory.create(factory.configToParams(config, { resourcesRegistry })));
  };

  withActive.active$.subscribe((wrapper: TEnvMapWrapper | undefined): void => {
    if (isDefined(wrapper)) {
      sceneW.setBackground(wrapper.entity);
      sceneW.setEnvironmentMap(wrapper.entity);
    }
  });

  const findActive = withActive.findActive;

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();
    // TODO DESTROY: We need a way to unload env maps, tho
    resourcesRegistry.destroy();
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
    // TODO 9.0.0. RESOURCES: add getResourceRegistry registry to the rest or resources services
    getResourceRegistry: (): TEnvMapTextureAsyncRegistry => resourcesRegistry,
    getScene: (): TSceneWrapper => sceneW,
    ...destroyable
  };
}
