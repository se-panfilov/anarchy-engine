import { merge, Subject, Subscription } from 'rxjs';

import type { IAbstractAsyncRegistry, IAbstractEntityRegistry, IAsyncReactiveFactory, IParamsFromConfig, IProtectedRegistry, IReactiveFactory, IWrapper } from '@/Engine/Abstract';
import { CommonTag } from '@/Engine/Abstract';
import type { IActorAsyncRegistry, IActorConfig, IActorFactory, IActorWrapperAsync } from '@/Engine/Actor';
import { ActorAsyncRegistry, ActorFactory } from '@/Engine/Actor';
import type { ICameraConfig, ICameraFactory, ICameraRegistry } from '@/Engine/Camera';
import { CameraFactory, CameraRegistry } from '@/Engine/Camera';
import type { IFogConfig, IFogFactory, IFogRegistry, IFogWrapper } from '@/Engine/Fog';
import { FogFactory, FogRegistry } from '@/Engine/Fog';
import type { ILightConfig, ILightFactory, ILightRegistry } from '@/Engine/Light';
import { LightFactory, LightRegistry } from '@/Engine/Light';
import type { IRegistrable, IWithReadonlyTags } from '@/Engine/Mixins';
import type { ISceneConfig, ISceneFactory, ISceneObject, ISceneRegistry, ISceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry } from '@/Engine/Scene';
import { initText2dRenderer, initText3dRenderer, isText2dWrapper, isText3dWrapper, Text3dRegistry, Text2dRegistry, TextFactory } from '@/Engine/Text';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer, ITextAnyWrapper, ITextConfig, ITextFactory } from '@/Engine/Text';
import { ambientContext } from '@/Engine/Context';

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

export function initScenes(scenes: ReadonlyArray<ISceneConfig>): { sceneCreated$: Subscription; sceneFactory: ISceneFactory; sceneRegistry: ISceneRegistry } {
  const sceneFactory: ISceneFactory = SceneFactory();
  const sceneRegistry: ISceneRegistry = SceneRegistry();
  const sceneCreated$: Subscription = sceneFactory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => sceneRegistry.add(wrapper));
  scenes.forEach((config: ISceneConfig): ISceneWrapper => sceneFactory.create(sceneFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

  return { sceneCreated$, sceneFactory, sceneRegistry };
}

export function initActors(
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
  const { added$: actorAdded$, created$: actorCreated$ } = initAsync(scene, actorFactory, actorRegistry, actors, feedbackMessage);

  return { actorAdded$, actorCreated$, actorFactory, actorRegistry };
}

export function initCameras(
  scene: ISceneWrapper,
  cameras: ReadonlyArray<ICameraConfig>
): { cameraAdded$: Subscription; cameraCreated$: Subscription; cameraFactory: ICameraFactory; cameraRegistry: ICameraRegistry } {
  const cameraFactory: ICameraFactory = CameraFactory();
  const cameraRegistry: ICameraRegistry = CameraRegistry();
  const { added$: cameraAdded$, created$: cameraCreated$ } = init(scene, cameraFactory, cameraRegistry, cameras);

  return { cameraAdded$, cameraCreated$, cameraFactory, cameraRegistry };
}

export function initLights(
  scene: ISceneWrapper,
  lights: ReadonlyArray<ILightConfig>
): { lightAdded$: Subscription; lightCreated$: Subscription; lightFactory: ILightFactory; lightRegistry: ILightRegistry } {
  const lightFactory: ILightFactory = LightFactory();
  const lightRegistry: ILightRegistry = LightRegistry();
  const { added$: lightAdded$, created$: lightCreated$ } = init(scene, lightFactory, lightRegistry, lights);

  return { lightAdded$, lightCreated$, lightFactory, lightRegistry };
}

export function initFogs(scene: ISceneWrapper, fogs: ReadonlyArray<IFogConfig>): { fogAdded$: Subscription; fogCreated$: Subscription; fogFactory: IFogFactory; fogRegistry: IFogRegistry } {
  const fogFactory: IFogFactory = FogFactory();
  const fogRegistry: IFogRegistry = FogRegistry();
  const fogAdded$: Subscription = fogRegistry.added$.subscribe((fog: IFogWrapper) => scene.setFog(fog));
  const fogCreated$: Subscription = fogFactory.entityCreated$.subscribe((fog: IFogWrapper): void => fogRegistry.add(fog));
  fogs.forEach((fog: IFogConfig): IFogWrapper => fogFactory.create(fogFactory.configToParams({ ...fog, tags: [...fog.tags, CommonTag.FromConfig] })));

  return { fogAdded$, fogCreated$, fogFactory, fogRegistry };
}

export function initTexts(
  scene: ISceneWrapper,
  texts: ReadonlyArray<ITextConfig>
): {
  textAdded$: Subscription;
  textCreated$: Subscription;
  textFactory: ITextFactory;
  text2dRegistry: IText2dRegistry;
  text3dRegistry: IText3dRegistry;
  text2dRenderer: IText2dRenderer;
  text3dRenderer: IText3dRenderer;
} {
  const textFactory: ITextFactory = TextFactory();

  const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);

  const text2dRegistry: IText2dRegistry = Text2dRegistry();
  const text3dRegistry: IText3dRegistry = Text3dRegistry();

  const textAdded$: Subscription = merge(text2dRegistry.added$, text3dRegistry.added$).subscribe((text: ITextAnyWrapper) => scene.addText(text));
  const textCreated$: Subscription = textFactory.entityCreated$.subscribe((text: ITextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    if (isText3dWrapper(text)) text3dRegistry.add(text);
  });
  texts.forEach((text: ITextConfig): ITextAnyWrapper => textFactory.create(textFactory.configToParams({ ...text, tags: [...text.tags, CommonTag.FromConfig] })));

  return { textAdded$, textCreated$, textFactory, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer };
}
