import { CommonTag } from '@/Engine/Abstract';
import type { IActorAsyncRegistry, IActorConfig, IActorFactory, IActorParams, IActorService, IActorWrapperAsync } from '@/Engine/Actor/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

export function ActorService(factory: IActorFactory, registry: IActorAsyncRegistry, scene: ISceneWrapper): IActorService {
  registry.added$.subscribe((wrapper: IActorWrapperAsync): void => scene.addActor(wrapper));
  factory.entityCreated$.subscribe((wrapper: IActorWrapperAsync): void => registry.add(wrapper));

  const createAsync = (params: IActorParams): Promise<IActorWrapperAsync> => factory.createAsync(params);
  const createFromConfig = (actors: ReadonlyArray<IActorConfig>): void => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    actors.forEach((config: IActorConfig): Promise<IActorWrapperAsync> => {
      const params: IActorParams = factory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] });
      return factory.createAsync(params);
    });
  };

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfig,
    ...destroyable
  };
}
