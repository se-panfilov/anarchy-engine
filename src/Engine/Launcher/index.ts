import type { IActorConfig, ICameraConfig, IControlsConfig, ILightConfig, ISceneConfig } from '@Engine/Launcher/Models';
import type { IAppCanvas, IMousePosition, IWatcher } from '@Engine/Models';
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
import type { IActorRegistry, ICameraRegistry, ILightRegistry } from '@Engine/Registries';
import { ActorRegistry, CameraRegistry, LightRegistry } from '@Engine/Registries';
import { createDeferredPromise } from '@Engine/Utils';
import type {
  IActorWrapper,
  ICameraWrapper,
  IControlsWrapper,
  ILightWrapper,
  ILoopWrapper,
  IRendererWrapper,
  ISceneWrapper
} from '@Engine/Wrappers';
import { MouseClicksWatcher, MousePositionWatcher } from '@Engine/Watchers';

export async function launch(sceneConfig: ISceneConfig, canvas: IAppCanvas): Promise<boolean> {
  const { name, actors, cameras, lights, controls } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<boolean>();

  //Watchers
  const mouseClicksWatcher: IWatcher<void> = MouseClicksWatcher();
  mouseClicksWatcher.start$.next();
  const mousePositionWatcher: IWatcher<IMousePosition> = MousePositionWatcher();
  mousePositionWatcher.start$.next();

  //Entities registries
  const actorRegistry: IActorRegistry = ActorRegistry();
  const cameraRegistry: ICameraRegistry = CameraRegistry();
  const lightRegistry: ILightRegistry = LightRegistry();

  //Factories
  const sceneFactory: ISceneFactory = SceneFactory();
  const actorFactory: IActorFactory = ActorFactory();
  const cameraFactory: ICameraFactory = CameraFactory();
  const lightFactory: ILightFactory = LightFactory();
  const rendererFactory: IRendererFactory = RendererFactory();
  const controlsFactory: IControlsFactory = ControlsFactory({ canvas, cameraRegistry });
  const loopFactory: ILoopFactory = LoopFactory();

  //Dynamic create entities
  const scene: ISceneWrapper = sceneFactory.create({ name });

  actors.forEach((config: IActorConfig): void => {
    const actor: IActorWrapper = actorFactory.fromConfig(config);
    actorRegistry.add(actor);
    scene.addActor(actor);
  });

  cameras.forEach((config: ICameraConfig): void => {
    const camera: ICameraWrapper = cameraFactory.fromConfig(config);
    cameraRegistry.add(camera);
    scene.addCamera(camera);
  });

  lights.forEach((config: ILightConfig): void => {
    const light: ILightWrapper = lightFactory.fromConfig(config);
    lightRegistry.add(light);
    scene.addLight(light);
  });

  controls.forEach((config: IControlsConfig): void => {
    const control: IControlsWrapper = controlsFactory.fromConfig(config);
    // TODO (S.Panfilov) CWP implement controlsRegistry
    // controlsRegistry.add(control);
    // scene.addControl(control);
  });

  const renderer: IRendererWrapper = rendererFactory.create({ canvas });
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
  const loop: ILoopWrapper = loopFactory.create({} as any);
  loop.start(renderer, scene, camera);
  ////////////////////////////////////

  resolve(true);

  return promise;
}
