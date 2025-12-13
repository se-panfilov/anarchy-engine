import type {
  TActorAsyncRegistry,
  TActorConfig,
  TActorFactory,
  TActorParams,
  TActorService,
  TActorServiceDependencies,
  TActorWrapperAsync,
  TActorWrapperWithPhysicsAsync
} from '@/Engine/Actor/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export function ActorService(factory: TActorFactory, registry: TActorAsyncRegistry, actorServiceDependencies: TActorServiceDependencies, scene: TSceneWrapper): TActorService {
  registry.added$.subscribe((wrapper: TActorWrapperAsync | TActorWrapperWithPhysicsAsync): void => scene.addActor(wrapper));
  factory.entityCreated$.subscribe((wrapper: TActorWrapperAsync | TActorWrapperWithPhysicsAsync): void => registry.add(wrapper));

  const createAsync = (params: TActorParams): Promise<TActorWrapperAsync | TActorWrapperWithPhysicsAsync> => factory.createAsync(params, actorServiceDependencies);
  const createFromConfig = (actors: ReadonlyArray<TActorConfig>): void => {
    const spatialGridRegistry: TSpatialGridRegistry = actorServiceDependencies.spatialGridService.getRegistry();
    actors.forEach(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      (config: TActorConfig): Promise<TActorWrapperAsync | TActorWrapperWithPhysicsAsync> => factory.createAsync(factory.configToParams(config, { spatialGridRegistry }), actorServiceDependencies)
    );
  };

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfig,
    getFactory: (): TActorFactory => factory,
    getRegistry: (): TActorAsyncRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
