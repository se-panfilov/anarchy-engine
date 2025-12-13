import type { TActorConfig, TActorFactory, TActorParams, TActorRegistry, TActorService, TActorServiceDependencies, TActorWrapper, TActorWrapperWithPhysics } from '@/Engine/Actor/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TModels3dAsyncRegistry } from '@/Engine/Models3d';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export function ActorService(factory: TActorFactory, registry: TActorRegistry, actorServiceDependencies: TActorServiceDependencies, scene: TSceneWrapper): TActorService {
  registry.added$.subscribe((wrapper: TActorWrapper | TActorWrapperWithPhysics): void => scene.addActor(wrapper));
  factory.entityCreated$.subscribe((wrapper: TActorWrapper | TActorWrapperWithPhysics): void => registry.add(wrapper));

  const create = (params: TActorParams): TActorWrapper | TActorWrapperWithPhysics => factory.create(params, actorServiceDependencies);
  const createFromConfig = (actors: ReadonlyArray<TActorConfig>): void => {
    const spatialGridRegistry: TSpatialGridRegistry = actorServiceDependencies.spatialGridService.getRegistry();
    const models3dRegistry: TModels3dAsyncRegistry = actorServiceDependencies.models3dService.getRegistry();
    actors.forEach(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      (config: TActorConfig): TActorWrapper | TActorWrapperWithPhysics => factory.create(factory.configToParams(config, { spatialGridRegistry, models3dRegistry }), actorServiceDependencies)
    );
  };

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TActorFactory => factory,
    getRegistry: (): TActorRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
