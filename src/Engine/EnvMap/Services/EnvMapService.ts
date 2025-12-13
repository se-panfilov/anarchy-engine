import { EnvMapLoader } from '@/Engine/EnvMap/Loader';
import type { TEnvMapAsyncRegistry, TEnvMapConfigPack, TEnvMapFactory, TEnvMapLoader, TEnvMapParams, TEnvMapPropsPack, TEnvMapService, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function EnvMapService(factory: TEnvMapFactory, registry: TEnvMapAsyncRegistry, sceneW: TSceneWrapper): TEnvMapService {
  registry.added$.subscribe((wrapper: TEnvMapWrapperAsync): void => {
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });

  factory.entityCreated$.subscribe((wrapper: TEnvMapWrapperAsync): void => registry.add(wrapper.getUrl(), wrapper));

  const withActive: TWithActiveMixinResult<TEnvMapWrapperAsync> = withActiveEntityServiceMixin<TEnvMapWrapperAsync>(registry);
  const envMapLoader: TEnvMapLoader = EnvMapLoader(registry);

  // TODO CWP !!!
  // TODO 9.0.0. RESOURCES: add create/createFromConfig (async) + factories
  const createAsync = (params: TEnvMapParams): Promise<TEnvMapWrapperAsync> => factory.createAsync(params, { envMapLoader });
  const createFromConfigAsync = (envMaps: ReadonlyArray<TEnvMapConfigPack>): Promise<ReadonlyArray<TEnvMapWrapperAsync>> => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return Promise.all(envMaps.map((config: TEnvMapConfigPack): Promise<TEnvMapWrapperAsync> => factory.createAsync(factory.configToParams(config), { envMapLoader })));
  };

  withActive.active$.subscribe(({ texture }: TEnvMapPropsPack): void => {
    sceneW.setBackground(texture);
    sceneW.setEnvironmentMap(texture);
  });

  const findActive = withActive.findActive;

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    // TODO DESTROY: We need a way to unload env maps, tho
    registry.destroy();
    withActive.active$.unsubscribe();
    withActive.active$.complete();
  });

  return {
    createAsync,
    createFromConfigAsync,
    setActive: withActive.setActive,
    findActive,
    active$: withActive.active$.asObservable(),
    getFactory: (): TEnvMapFactory => factory,
    getRegistry: (): TEnvMapAsyncRegistry => registry,
    getScene: (): TSceneWrapper => sceneW,
    ...destroyable
  };
}
