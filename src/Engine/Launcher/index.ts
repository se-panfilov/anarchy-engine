import { CameraTag, LoopTag, RendererTag } from '@Engine/Constants';
import { addToRegistry } from '@Engine/Launcher/AddToRegistry';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import type { IAppCanvas, IStartedScene } from '@Engine/Models';
import { IProtectedRegistry } from '@Engine/Models';
import { initRegistriesAddSubscription } from '@Engine/Pool/GetRegistiryPool';
import type { IFactoriesPool, IRegistriesPool } from '@Engine/Pool/Models';
import { isNotDefined } from '@Engine/Utils';
import type { ICameraWrapper, ILoopWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

export function launchScene(
  sceneConfig: ISceneConfig,
  canvas: IAppCanvas,
  factoriesPool: IFactoriesPool,
  registryPool: IRegistriesPool
): IStartedScene {
  const { name: sceneName, actors, cameras, lights, controls, tags: sceneTags } = sceneConfig;
  const { actorFactory, cameraFactory, lightFactory, controlsFactory, rendererFactory, sceneFactory, loopFactory } =
    factoriesPool;
  const { actorRegistry, cameraRegistry, lightRegistry, controlsRegistry } = registryPool;

  const scene: ISceneWrapper = sceneFactory.create({ name: sceneName, tags: sceneTags });

  initRegistriesAddSubscription(scene, registryPool);

  addToRegistry(actors, actorFactory, actorRegistry);
  addToRegistry(cameras, cameraFactory, cameraRegistry);
  addToRegistry(lights, lightFactory, lightRegistry);
  addToRegistry(controls, controlsFactory, controlsRegistry);

  // TODO (S.Panfilov) everything below should be extracted from the launchScene()
  const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main] });

  const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main] });
  const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqWithTag([CameraTag.Initial]);
  if (isNotDefined(initialCamera))
    throw new Error(`Cannot start the main loop for the scene ${sceneName}: initial camera is not defined`);
  loop.start(renderer, scene, initialCamera);

  function destroy(): void {
    // TODO (S.Panfilov) any
    Object.values(registryPool).forEach((registry: IProtectedRegistry<any>): void => registry.destroy());
    loop.destroy();
    renderer.destroy();
    scene.destroy();
  }

  return { loop, renderer, registryPool, canvas, destroy };
}
