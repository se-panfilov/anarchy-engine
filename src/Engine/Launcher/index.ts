import type { ActorConfig, CameraConfig, LightConfig, SceneConfig } from '@Engine/Launcher/Models';
import type { Registry, ScreenParams, Watcher } from '@Engine/Models';
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
import { DeviceWatcher, MouseClicksWatcher, MousePositionWatcher } from '@Engine/Watchers';
import type { MousePosition } from '@Engine/Models';

export async function launch(sceneConfig: SceneConfig): Promise<void> {
  const { name, actors, cameras, lights } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  //Watchers
  const deviceWatcher: Watcher<ScreenParams> = DeviceWatcher();
  // deviceWatcher.value$.subscribe(console.log)
  deviceWatcher.start$.next();
  const mouseClicksWatcher: Watcher<void> = MouseClicksWatcher();
  // mouseClicksWatcher.value$.subscribe(console.log)
  mouseClicksWatcher.start$.next();
  const mousePositionWatcher: Watcher<MousePosition> = MousePositionWatcher();
  // mousePositionWatcher.value$.subscribe(console.log)
  mousePositionWatcher.start$.next();

  //Factories
  const sceneFactory: ISceneFactory = SceneFactory();
  const actorFactory: IActorFactory = ActorFactory();
  const cameraFactory: ICameraFactory = CameraFactory();
  const lightFactory: ILightFactory = LightFactory();
  const rendererFactory: IRendererFactory = RendererFactory();
  const loopFactory: ILoopFactory = LoopFactory();

  //Entities registries
  const actorRegistry: Registry<IActorWrapper> = ActorRegistry();
  const cameraRegistry: Registry<ICameraWrapper> = CameraRegistry();
  const lightRegistry: Registry<ILightWrapper> = LightRegistry();

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

  // TODO (S.Panfilov) CWP
  // debug the scene to make sure no errors and it's fully rendering
  // and fix this loop
  combineLatest([loopFactory.latest$, rendererFactory.latest$, sceneFactory.latest$, cameraFactory.latest$]).subscribe(
    ([loop, renderer, scene, camera]: [ILoopWrapper, IRendererWrapper, ISceneWrapper, ICameraWrapper]) => {
      console.log('111');
      loop.start(renderer, scene, camera);
      console.log(loop);
    }
  );

  //Dynamic create entities
  sceneFactory.create$.next({ name });
  actors.forEach((config: ActorConfig) => actorFactory.createFromConfig$.next(config));
  cameras.forEach((config: CameraConfig) => cameraFactory.createFromConfig$.next(config));
  lights.forEach((config: LightConfig) => lightFactory.createFromConfig$.next(config));

  // TODO (S.Panfilov) canvas (or something else) should come from settings
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

  // start loop (renderer, scene, camera)/////////////////////

  // TODO (S.Panfilov) any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loopFactory.create$.next({} as any);
  ////////////////////////////////////

  resolve();

  return promise;
}
