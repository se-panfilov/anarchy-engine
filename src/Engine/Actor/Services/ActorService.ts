import type { TActorAsyncRegistry, TActorConfig, TActorFactory, TActorParams, TActorService, TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsService } from '@/Engine/Physics';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ActorService(
  factory: TActorFactory,
  registry: TActorAsyncRegistry,
  materialTextureService: TMaterialTextureService,
  physicsService: TPhysicsService,
  scene: TSceneWrapper
): TActorService {
  registry.added$.subscribe((wrapper: TActorWrapperAsync): void => scene.addActor(wrapper));
  factory.entityCreated$.subscribe((wrapper: TActorWrapperAsync): void => registry.add(wrapper));

  const createAsync = (params: TActorParams): Promise<TActorWrapperAsync> => factory.createAsync(params, { materialTextureService, physicsService });
  const createFromConfig = (actors: ReadonlyArray<TActorConfig>): void => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    actors.forEach((config: TActorConfig): Promise<TActorWrapperAsync> => factory.createAsync(factory.configToParams(config), { materialTextureService }));
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
