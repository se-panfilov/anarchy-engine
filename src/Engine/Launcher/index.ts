import { ActorFactory } from '@Engine/Managers/ActorFactory';
import type { ActorConfig, CameraConfig, LightConfig, SceneConfig } from '@Engine/Launcher/Models';
import { createDeferredPromise, isNotDefined } from '@Engine/Utils';
import { actorAdapter, lightAdapter } from '@Engine/Launcher/ConfigToParamAdapters';
import type { ActorParams } from '@Engine/Models/ActorParams';
import { SceneFactory } from '@Engine/Managers/SceneFactory';
import type { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { CameraFactory } from '@Engine/Managers/CameraFactory';
import { RendererFactory } from '@Engine/Managers/RendererFactory';
import { LightFactory } from '@Engine/Managers/LightFactory';
import type { LightParams } from '@Engine/Models/LightParams';

export async function launch(sceneConfig: SceneConfig): Promise<void> {
  const { name, actors, cameras, lights } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  // create scene/////////////////////
  const sceneManager = new SceneFactory();
  const scene: SceneWrapper = sceneManager.create(name);
  ////////////////////////////////////

  const actorFactory = ActorFactory();
  const cameraFactory = CameraFactory();
  const lightFactory = LightFactory();
  const rendererFactory = RendererFactory();

  actorFactory.latest$.subscribe(scene.addActor);
  cameraFactory.latest$.subscribe(scene.addCamera);
  lightFactory.latest$.subscribe(scene.addLight);

  // create actors/////////////////////
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

  cameras.forEach((config: CameraConfig) => {
    cameraFactory.add$.next(config.params);
    camera.lookAt(config.lookAt.x, config.lookAt.y, config.lookAt.z);
    camera.setPosition(config.position.x, config.position.y, config.position.z);
  });

  const canvas: HTMLElement | null = document.querySelector('#app');
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
  rendererFactory.add$.next(canvas);

  // //create lights/////////////////////
  lights.forEach((config: LightConfig) => {
    const params: LightParams = lightAdapter(config);
    lightFactory.add$.next(params);
  });
  // ////////////////////////////////////

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
