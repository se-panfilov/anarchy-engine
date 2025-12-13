import type { IActorConfig, ICameraConfig, IControlsConfig, ILightConfig, ISceneConfig } from '@Engine/Launcher/Models';
import type { IMousePosition, IRegistry, IWatcher } from '@Engine/Models';
import type {
  IActorFactory,
  ICameraFactory,
  IControlsFactory,
  ILightFactory,
  ILoopFactory,
  IRendererFactory,
  ISceneFactory
} from '@Engine/Factories';
import {
  ActorFactory,
  CameraFactory,
  ControlsFactory,
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
  IControlsWrapper,
  ILightWrapper,
  ILoopWrapper,
  IRendererWrapper,
  ISceneWrapper
} from '@Engine/Wrappers';
import { combineLatest } from 'rxjs';
import { MouseClicksWatcher, MousePositionWatcher } from '@Engine/Watchers';

export async function launch(sceneConfig: ISceneConfig, canvas: HTMLElement): Promise<void> {
  const { name, actors, cameras, lights, controls } = sceneConfig;
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
  const controlsFactory: IControlsFactory = ControlsFactory();
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

  combineLatest([controlsFactory.latest$, sceneFactory.latest$]).subscribe(
    ([control, scene]: [IControlsWrapper, ISceneWrapper]): void => {
      if (isNotDefined(scene) || isNotDefined(control)) return;
      console.log('control!!');
      // controlsRegistry.add$.next(control);
      // scene.addControl$.next(control);
    }
  );

  combineLatest([loopFactory.latest$, rendererFactory.latest$, sceneFactory.latest$, cameraFactory.latest$]).subscribe(
    ([loop, renderer, scene, camera]: [ILoopWrapper, IRendererWrapper, ISceneWrapper, ICameraWrapper]): void => {
      // TODO (S.Panfilov) this loop should start once every entity in the list is ready, not earlyer
      // TODO (S.Panfilov) and once, not twice or whatever
      // TODO (S.Panfilov) check!
      loop.start(renderer, scene, camera);
    }
  );

  //Dynamic create entities
  sceneFactory.create$.next({ name });
  actors.forEach((config: IActorConfig) => actorFactory.createFromConfig$.next(config));
  cameras.forEach((config: ICameraConfig) => cameraFactory.createFromConfig$.next(config));
  lights.forEach((config: ILightConfig) => lightFactory.createFromConfig$.next(config));
  controls.forEach((config: IControlsConfig) => controlsFactory.createFromConfig$.next(config));

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
