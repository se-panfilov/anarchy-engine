import { ActorManager } from '@Engine/Managers/ActorManager';
import type { ActorConfig, CameraConfig, LightConfig, SceneConfig } from '@Engine/Launcher/Models';
import { createDeferredPromise } from '@Engine/Utils';
import { actorAdapter, lightAdapter } from '@Engine/Launcher/ConfigToParamAdapters';
import type { ActorParams } from '@Engine/Models/ActorParams';
import type { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { SceneManager } from '@Engine/Managers/SceneManager';
import type { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { CameraManager } from '@Engine/Managers/CameraManager';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import { RendererManager } from '@Engine/Managers/RendererManager';
import { LightManager } from '@Engine/Managers/LightManager';
import type { LightParams } from '@Engine/Models/LightParams';

export async function launch(sceneConfig: SceneConfig): Promise<void> {
  const { name, actors, cameras, lights } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  // watch device resize
  // TODO (S.Panfilov)

  // create actors
  const actorManager = new ActorManager();

  actors.forEach((config: ActorConfig) => {
    const params: ActorParams = actorAdapter(config);
    const actor: ActorWrapper = actorManager.create(params);
  });

  // create scene
  const sceneManager = new SceneManager();
  const scene: SceneWrapper = sceneManager.create(name);

  // add actors to scene
  // TODO (S.Panfilov)

  // create camera
  const cameraManager = new CameraManager();
  cameras.forEach((config: CameraConfig) => {
    // TODO (S.Panfilov) deviceWatcher should be DI
    const camera: CameraWrapper = cameraManager.create(config.params, deviceWatcher);
    camera.lookAt(config.lookAt);
    camera.setPosition(config.position);
  });

  // add camera to scene
  // TODO (S.Panfilov)

  // create renderer
  const rendererManager = new RendererManager();
  // TODO (S.Panfilov) deviceWatcher should be DI, and canvas also (cause it's global)
  const renderer = rendererManager.create(canvas, deviceWatcher);

  //create lights
  const lightManager = new LightManager();
  lights.forEach((config: LightConfig) => {
    const params: LightParams = lightAdapter(config);
    const light: ActorWrapper = lightManager.create(params);
  });

  // add lights to scene
  // TODO (S.Panfilov)

  // create controls (needs camera, renderer)
  // TODO (S.Panfilov)

  // create mouse pointer
  // TODO (S.Panfilov)

  // create intersection pointer (mouse pointer, camera, scene)
  // TODO (S.Panfilov)

  // listen clicks by intersection pointer
  // TODO (S.Panfilov)

  // start loop (renderer, scene, camera)
  // TODO (S.Panfilov)

  resolve();

  return promise;
}
