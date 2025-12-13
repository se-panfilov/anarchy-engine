import type { Subject, Subscription } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { IActorAsyncRegistry, IActorConfig, IActorFactory, IActorParams, IActorWrapperAsync } from '@/Engine/Actor';
import { ActorAsyncRegistry, ActorFactory } from '@/Engine/Actor';
import type { ISceneWrapper } from '@/Engine/Scene';

export function initActorsEntityPipe(
  scene: ISceneWrapper,
  actors: ReadonlyArray<IActorConfig>,
  feedbackMessage: Subject<IActorWrapperAsync>
): {
  actorAdded$: Subscription;
  actorCreated$: Subscription;
  actorFactory: IActorFactory;
  actorRegistry: IActorAsyncRegistry;
} {
  const actorFactory: IActorFactory = ActorFactory();
  const actorRegistry: IActorAsyncRegistry = ActorAsyncRegistry();

  const actorAdded$: Subscription = actorRegistry.added$.subscribe((wrapper: IActorWrapperAsync) => scene.addActor(wrapper));
  const actorCreated$: Subscription = actorFactory.entityCreated$.subscribe((wrapper: IActorWrapperAsync): void => actorRegistry.add(wrapper));

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  actors.forEach((config: IActorConfig): Promise<IActorWrapperAsync> => {
    const params: IActorParams = actorFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] });
    return actorFactory.createAsync(params).then((wrapper: IActorWrapperAsync) => {
      feedbackMessage.next(wrapper);
      return wrapper;
    });
  });

  return { actorAdded$, actorCreated$, actorFactory, actorRegistry };
}
