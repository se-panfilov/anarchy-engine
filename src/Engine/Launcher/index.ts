import { ActorFactory } from '@Engine/Managers/ActorFactory';
import type { ActorConfig, CameraConfig, LightConfig, SceneConfig } from '@Engine/Launcher/Models';
import { createDeferredPromise } from '@Engine/Utils';
import { actorAdapter, lightAdapter } from '@Engine/Launcher/ConfigToParamAdapters';
import type { ActorParams } from '@Engine/Models/ActorParams';
import type { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { SceneManager } from '@Engine/Managers/SceneManager';
import type { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { CameraFactory, CameraManager } from '@Engine/Managers/CameraFactory';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import { RendererManager } from '@Engine/Managers/RendererManager';
import { LightFactory, LightManager } from '@Engine/Managers/LightManager';
import type { LightParams } from '@Engine/Models/LightParams';

export async function launch(sceneConfig: SceneConfig): Promise<void> {
  const { name, actors, cameras, lights } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  // create scene/////////////////////
  const sceneManager = new SceneManager();
  const scene: SceneWrapper = sceneManager.create(name);
  ////////////////////////////////////

  const actorFactory = ActorFactory();
  const cameraFactory = CameraFactory();
  const lightFactory = LightFactory();

  // create actors/////////////////////
  actorFactory.latest$.subscribe(scene.addActor);
  cameraFactory.latest$.subscribe(scene.addCamera);
  lightFactory.latest$.subscribe(scene.addLight);

  const rendererManager = new RendererManager();

  ////////////////////////////////////

  actors.forEach((config: ActorConfig) => {
    const params: ActorParams = actorAdapter(config);
    actorFactory.add$.next(params);
    // TODO (S.Panfilov) CWP we should set actor's position adn etc in a single place, avoid multiple subscriptions if possible
    // const actor: ActorWrapper = actorManager.create(params);
    actor.setPosition(config.position.x, config.position.y, config.position.z);
    actor.setCastShadow(config.castShadow);
  });
  ////////////////////////////////////

  // create camera/////////////////////

  // cameras.forEach((config: CameraConfig) => {
  //   // TODO (S.Panfilov) deviceWatcher should be DI
  //   const camera: CameraWrapper = cameraManager.create(config.params, deviceWatcher);
  //   camera.lookAt(config.lookAt.x, config.lookAt.y, config.lookAt.z);
  //   camera.setPosition(config.position.x, config.position.y, config.position.z);
  // });
  //
  // // add camera to scene/////////////////////
  // // TODO (S.Panfilov)
  // ////////////////////////////////////
  //
  // // create renderer/////////////////////
  // // TODO (S.Panfilov) deviceWatcher should be DI, and canvas also (cause it's global)
  // const renderer = rendererManager.create(canvas, deviceWatcher);
  // ////////////////////////////////////
  //
  // //create lights/////////////////////
  //
  // lights.forEach((config: LightConfig) => {
  //   const params: LightParams = lightAdapter(config);
  //   const light: ActorWrapper = lightManager.create(params);
  // });
  // ////////////////////////////////////

  // add lights to scene/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

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
  // TODO (S.Panfilov)
  ////////////////////////////////////

  resolve();

  return promise;
}
