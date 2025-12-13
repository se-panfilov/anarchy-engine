import type { ICameraWrapper, ILoopWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';
import type { IFactoriesPool, IRegistriesPool } from '@Engine/Pool/Models';
import { addToRegistry } from '@Engine/Launcher/AddToRegistry';
import { CameraTag } from '@Engine/Constants';
import { createDeferredPromise } from '@Engine/Utils';
import type { IAppCanvas } from '@Engine/Models';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import { initRegistriesAddSubscription } from '@Engine/Pool/GetRegistiryPool';

export async function launch(
  sceneConfig: ISceneConfig,
  canvas: IAppCanvas,
  factoriesPool: IFactoriesPool,
  registryPool: IRegistriesPool
): Promise<boolean> {
  const { name, actors, cameras, lights, controls } = sceneConfig;
  const { actorFactory, cameraFactory, lightFactory, controlsFactory, rendererFactory, sceneFactory, loopFactory } =
    factoriesPool;
  const { actorRegistry, cameraRegistry, lightRegistry, controlsRegistry } = registryPool;
  const { promise, resolve } = createDeferredPromise<boolean>();

  const scene: ISceneWrapper = sceneFactory.create({ name });

  initRegistriesAddSubscription(scene, registryPool);

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
