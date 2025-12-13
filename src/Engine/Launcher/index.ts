import type { IActorConfig, ISceneConfig } from '@Engine/Launcher/Models';
import type { IAppCanvas, IMousePosition } from '@Engine/Models';
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
import type { IActorRegistry, ICameraRegistry, IControlsRegistry, ILightRegistry } from '@Engine/Registries';
import { ActorRegistry, CameraRegistry, ControlsRegistry, LightRegistry } from '@Engine/Registries';
import { createDeferredPromise } from '@Engine/Utils';
import type {
  IActorWrapper,
  ICameraWrapper,
  ILightWrapper,
  ILoopWrapper,
  IRendererWrapper,
  ISceneWrapper
} from '@Engine/Wrappers';
import { MouseClicksWatcher, MousePositionWatcher } from '@Engine/Watchers';
import type { IWatcher } from '@Engine/Watchers';
import { CameraTag } from '@Engine/Constants';
import { addToRegistry } from '@Engine/Launcher/AddToRegistry';

export async function launch(sceneConfig: ISceneConfig, canvas: IAppCanvas): Promise<boolean> {
  const { name, actors, cameras, lights, controls } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<boolean>();

  //Watchers
  const mouseClicksWatcher: IWatcher<void> = MouseClicksWatcher();
  mouseClicksWatcher.start();
  const mousePositionWatcher: IWatcher<IMousePosition> = MousePositionWatcher();
  mousePositionWatcher.start();

  //Entities registries
  const actorRegistry: IActorRegistry = ActorRegistry();
  const cameraRegistry: ICameraRegistry = CameraRegistry();
  const lightRegistry: ILightRegistry = LightRegistry();
  const controlsRegistry: IControlsRegistry = ControlsRegistry();

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

  actorRegistry.added$.subscribe((actor: IActorWrapper) => scene.addActor(actor));
  cameraRegistry.added$.subscribe((camera: ICameraWrapper) => scene.addCamera(camera));
  lightRegistry.added$.subscribe((light: ILightWrapper) => scene.addLight(light));

  addToRegistry(actors, actorFactory, actorRegistry);
  addToRegistry(cameras, cameraFactory, cameraRegistry);
  addToRegistry(lights, lightFactory, lightRegistry);
  addToRegistry(controls, controlsFactory, controlsRegistry);

  const renderer: IRendererWrapper = rendererFactory.create({ canvas });

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
  const initialCamera: ICameraWrapper = cameraRegistry.getByTag(CameraTag.Initial);
  loop.start(renderer, scene, initialCamera);
  ////////////////////////////////////

  resolve(true);

  return promise;
}
