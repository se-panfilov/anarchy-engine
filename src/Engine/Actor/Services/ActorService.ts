import type { TActorAsyncRegistry, IActorConfig, IActorFactory, IActorParams, IActorService, TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { IMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ActorService(factory: IActorFactory, registry: TActorAsyncRegistry, materialTextureService: IMaterialTextureService, scene: TSceneWrapper): IActorService {
  registry.added$.subscribe((wrapper: TActorWrapperAsync): void => scene.addActor(wrapper));
  factory.entityCreated$.subscribe((wrapper: TActorWrapperAsync): void => registry.add(wrapper));

  const createAsync = (params: IActorParams): Promise<TActorWrapperAsync> => factory.createAsync(params, { materialTextureService });
  const createFromConfig = (actors: ReadonlyArray<IActorConfig>): void => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    actors.forEach((config: IActorConfig): Promise<TActorWrapperAsync> => factory.createAsync(factory.configToParams(config), { materialTextureService }));
  };

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfig,
    getFactory: (): IActorFactory => factory,
    getRegistry: (): TActorAsyncRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
