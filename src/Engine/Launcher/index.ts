import type { IActorConfig, ICameraConfig, ILightConfig, ISceneConfig } from '@Engine/Launcher/Models';
import type { IMousePosition, IRegistry, IWatcher } from '@Engine/Models';
import type {
  IActorFactory,
  ICameraFactory,
  ILightFactory,
  ILoopFactory,
  IRendererFactory,
  ISceneFactory
} from '@Engine/Factories';
import {
  ActorFactory,
  CameraFactory,
  LightFactory,
  LoopFactory,
  RendererFactory,
  SceneFactory
} from '@Engine/Factories';
import { ActorRegistry, CameraRegistry, LightRegistry } from '@Engine/Registries';
import { createDeferredPromise, isNotDefined } from '@Engine/Utils';
import type {
  IActorWrapper,
  ICameraWrapper,
  ILightWrapper,
  ILoopWrapper,
  IRendererWrapper,
  ISceneWrapper
} from '@Engine/Wrappers';
import { combineLatest } from 'rxjs';
import { MouseClicksWatcher, MousePositionWatcher } from '@Engine/Watchers';

export async function launch(sceneConfig: ISceneConfig): Promise<void> {
  const { name, actors, cameras, lights } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  //Watchers
  const mouseClicksWatcher: IWatcher<void> = MouseClicksWatcher();
  mouseClicksWatcher.start$.next();
  const mousePositionWatcher: IWatcher<IMousePosition> = MousePositionWatcher();
  mousePositionWatcher.start$.next();

  //Factories
  const sceneFactory: ISceneFactory = SceneFactory();
  const actorFactory: IActorFactory = ActorFactory();
  const cameraFactory: ICameraFactory = CameraFactory();
  const lightFactory: ILightFactory = LightFactory();
  const rendererFactory: IRendererFactory = RendererFactory();
  const loopFactory: ILoopFactory = LoopFactory();

  //Entities registries
  const actorRegistry: IRegistry<IActorWrapper> = ActorRegistry();
  const cameraRegistry: IRegistry<ICameraWrapper> = CameraRegistry();
  const lightRegistry: IRegistry<ILightWrapper> = LightRegistry();

  //Subscriptions
  combineLatest([actorFactory.latest$, sceneFactory.latest$]).subscribe(
    ([actor, scene]: [IActorWrapper, ISceneWrapper]): void => {
      if (isNotDefined(scene) || isNotDefined(actor)) return;
      actorRegistry.add$.next(actor);
      scene.addActor$.next(actor);
    }
  );

  combineLatest([cameraFactory.latest$, sceneFactory.latest$]).subscribe(
    ([camera, scene]: [ICameraWrapper, ISceneWrapper]): void => {
      if (isNotDefined(scene) || isNotDefined(camera)) return;
      cameraRegistry.add$.next(camera);
      scene.addCamera$.next(camera);
    }
  );

  combineLatest([lightFactory.latest$, sceneFactory.latest$]).subscribe(
    ([light, scene]: [ILightWrapper, ISceneWrapper]): void => {
      if (isNotDefined(scene) || isNotDefined(light)) return;
      lightRegistry.add$.next(light);
      scene.addLight$.next(light);
    }
  );

  combineLatest([loopFactory.latest$, rendererFactory.latest$, sceneFactory.latest$, cameraFactory.latest$]).subscribe(
    ([loop, renderer, scene, camera]: [ILoopWrapper, IRendererWrapper, ISceneWrapper, ICameraWrapper]): void => {
      loop.start(renderer, scene, camera);
    }
  );

  //Dynamic create entities
  sceneFactory.create$.next({ name });
  actors.forEach((config: IActorConfig) => actorFactory.createFromConfig$.next(config));
  cameras.forEach((config: ICameraConfig) => cameraFactory.createFromConfig$.next(config));
  lights.forEach((config: ILightConfig) => lightFactory.createFromConfig$.next(config));

  // TODO (S.Panfilov) canvas (or something else) should come from settings or ambient context
  const canvas: HTMLElement | null = document.querySelector('#app');
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');

  rendererFactory.create$.next({ canvas });
  // create controls (needs camera, renderer)/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // create mouse pointer/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // create intersection pointer (mouse pointer, camera, scene)/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // listen clicks by intersection pointer/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // TODO (S.Panfilov) any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loopFactory.create$.next({} as any);
  ////////////////////////////////////

  resolve();

  return promise;
}
