import { ActorManager } from '@Engine/Managers/ActorManager';
import type { ActorConfig, SceneConfig } from '@Engine/Launcher/Models';
import { createDeferredPromise } from '@Engine/Utils';

export function launch(sceneConfig: SceneConfig): Promise<void> {
  const { actors } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  // create actors
  const actorManager = new ActorManager();
  console.log(actors);
  actors.forEach((config: ActorConfig) => {
    actorManager.create(config);
  });

  resolve();

  return promise;
}

// TODO (S.Panfilov) flow

// create scene
// add actors to scene
// create camera
// add camera to scene
// watch device resize
// create renderer
// create controls (needs camera, renderer)
// create mouse pointer
// create intersection pointer (mouse pointer, camera, scene)
// listen clicks by intersection pointer
// start loop (renderer, scene, camera)
