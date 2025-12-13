import type { Subject, Subscription } from 'rxjs';

import type { IAbstractAsyncRegistry, IAbstractEntityRegistry, IAsyncReactiveFactory, IParamsFromConfig, IProtectedRegistry, IReactiveFactory, IWrapper } from '@/Engine/Abstract';
import { CommonTag } from '@/Engine/Abstract';
import type { IActorAsyncRegistry, IActorConfig, IActorFactory, IActorWrapperAsync } from '@/Engine/Actor';
import { ActorAsyncRegistry, ActorFactory } from '@/Engine/Actor';
import type { ICameraConfig, ICameraFactory, ICameraRegistry } from '@/Engine/Camera';
import { CameraFactory, CameraRegistry } from '@/Engine/Camera';
import type { IRegistrable, IWithReadonlyTags } from '@/Engine/Mixins';
import type { ISceneConfig, ISceneFactory, ISceneObject, ISceneRegistry, ISceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry } from '@/Engine/Scene';

function init<E extends ISceneObject, W extends IWrapper<E> & IRegistrable, R extends IAbstractEntityRegistry<W>, C extends IWithReadonlyTags<string>, P>(
  scene: ISceneWrapper,
  factory: IReactiveFactory<W, P> & IParamsFromConfig<C, P>,
  registry: IProtectedRegistry<R>,
  entitiesConfigList: ReadonlyArray<any>
): {
  added$: Subscription;
  created$: Subscription;
} {
  const added$: Subscription = registry.added$.subscribe((wrapper: W) => scene.add(wrapper.entity));
  const created$: Subscription = factory.entityCreated$.subscribe((wrapper: W): void => registry.add(wrapper));
  entitiesConfigList.forEach((config: C): W => factory.create(factory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

  return { added$, created$ };
}

function initAsync<E extends ISceneObject, W extends IWrapper<E> & IRegistrable, R extends IAbstractAsyncRegistry<W>, C extends IWithReadonlyTags<string>, P>(
  scene: ISceneWrapper,
  factory: IAsyncReactiveFactory<W, P> & IParamsFromConfig<C, P>,
  registry: IProtectedRegistry<R>,
  entitiesConfigList: ReadonlyArray<any>,
  feedbackMessage: Subject<W>
): {
  added$: Subscription;
  created$: Subscription;
} {
  const added$: Subscription = registry.added$.subscribe((wrapper: W) => scene.add(wrapper.entity));
  const created$: Subscription = factory.entityCreated$.subscribe((wrapper: W): void => registry.add(wrapper));
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  entitiesConfigList.forEach((config: C): Promise<W> => {
    const params: P = factory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] });
    return factory.createAsync(params).then((wrapper: W) => {
      feedbackMessage.next(wrapper);
      return wrapper;
    });
  });

  return { added$, created$ };
}

export function initScenes(scenes: ReadonlyArray<ISceneConfig>): { created$: Subscription; factory: ISceneFactory; registry: ISceneRegistry } {
  const factory: ISceneFactory = SceneFactory();
  const registry: ISceneRegistry = SceneRegistry();
  const created$: Subscription = factory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => registry.add(wrapper));
  scenes.forEach((config: ISceneConfig): ISceneWrapper => factory.create(factory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

  return { created$, factory, registry };
}

export function initActors(
  scene: ISceneWrapper,
  actors: ReadonlyArray<IActorConfig>,
  feedbackMessage: Subject<IActorWrapperAsync>
): {
  added$: Subscription;
  created$: Subscription;
  factory: IActorFactory;
  registry: IActorAsyncRegistry;
} {
  const factory: IActorFactory = ActorFactory();
  const registry: IActorAsyncRegistry = ActorAsyncRegistry();
  const { added$, created$ } = initAsync(scene, factory, registry, actors, feedbackMessage);

  return { added$, created$, factory, registry };
}

export function initCameras(scene: ISceneWrapper, cameras: ReadonlyArray<ICameraConfig>): { added$: Subscription; created$: Subscription; factory: ICameraFactory; registry: ICameraRegistry } {
  const factory: ICameraFactory = CameraFactory();
  const registry: ICameraRegistry = CameraRegistry();
  const { added$, created$ } = init(scene, factory, registry, cameras);

  return { added$, created$, factory, registry };
}
