import type { TRegistryPack } from '@/Engine/Abstract';
import type { TActor, TActorConfig, TActorFactory, TActorParams, TActorRegistry, TActorService, TActorServiceDependencies, TActorWithPhysics } from '@/Engine/Actor/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export function ActorService(factory: TActorFactory, registry: TActorRegistry, actorServiceDependencies: TActorServiceDependencies, scene: TSceneWrapper): TActorService {
  registry.added$.subscribe(({ value }: TRegistryPack<TActor | TActorWithPhysics>): void => scene.addModel3d(value.entity.getRawModel3d()));
  factory.entityCreated$.subscribe((wrapper: TActor | TActorWithPhysics): void => registry.add(wrapper));

  const create = (params: TActorParams): TActor | TActorWithPhysics => factory.create(params, actorServiceDependencies);
  const createFromConfig = (actors: ReadonlyArray<TActorConfig>): ReadonlyArray<TActor | TActorWithPhysics> => {
    const spatialGridRegistry: TSpatialGridRegistry = actorServiceDependencies.spatialGridService.getRegistry();
    return actors.map(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      (config: TActorConfig): TActor | TActorWithPhysics => create(factory.configToParams(config, { spatialGridRegistry, models3dService: actorServiceDependencies.models3dService }))
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
