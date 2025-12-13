import { CameraTag, LoopTag, RendererTag } from '@Engine/Constants';
import { addToRegistry } from '@Engine/Launcher/AddToRegistry';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import type { IAppCanvas, ISceneLauncher, IStartedScene } from '@Engine/Models';
import type { IRegistryPool, ISceneFactories, ISceneFactoryPool } from '@Engine/Pool';
import { RegistryPool } from '@Engine/Pool';
import type { IFactories, IRegistries } from '@Engine/Pool/Models';
import { SceneFactoriesPool } from '@Engine/Pool/SceneFactoriesPool';
import { isNotDefined } from '@Engine/Utils';
import type { ICameraWrapper, ILoopWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';
import { BehaviorSubject } from 'rxjs';

export function SceneLauncher(sceneConfig: ISceneConfig, canvas: IAppCanvas, factories: IFactories): ISceneLauncher {
  const { name: sceneName, actors, cameras, lights, controls, tags: sceneTags } = sceneConfig;

  const prepared$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const launched$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  let registryPool: IRegistryPool;
  let sceneFactoriesPool: ISceneFactoryPool;
  let sceneFactories: ISceneFactories;
  let registries: IRegistries;
  let scene: ISceneWrapper;
  let renderer: IRendererWrapper;
  let loop: ILoopWrapper;

  function prepare(): void {
    registryPool = RegistryPool();
    registries = registryPool.init();
    sceneFactoriesPool = SceneFactoriesPool({ canvas, cameraRegistry: registries.cameraRegistry });
    sceneFactories = sceneFactoriesPool.init();
    prepared$.next(true);
  }

  function launch(): IStartedScene {
    if (!prepared$.value) prepare();

    const { actorFactory, cameraFactory, lightFactory, rendererFactory, sceneFactory, loopFactory } = factories;
    const { actorRegistry, cameraRegistry, lightRegistry, controlsRegistry } = registries;
    const { controlsFactory } = sceneFactories;
    scene = sceneFactory.create({ name: sceneName, tags: sceneTags });

    registryPool.startAddSubscription(scene);

    addToRegistry(actors, actorFactory, actorRegistry);
    addToRegistry(cameras, cameraFactory, cameraRegistry);
    addToRegistry(lights, lightFactory, lightRegistry);
    addToRegistry(controls, controlsFactory, controlsRegistry);

    // TODO (S.Panfilov) everything below should be extracted from the launchScene()
    const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main] });

    const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main] });
    const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqWithTag([CameraTag.Initial]);
    if (isNotDefined(initialCamera)) throw new Error(`Cannot start the main loop for the scene ${sceneName}: initial camera is not defined`);
    loop.start(renderer, scene, initialCamera);

    launched$.next(true);
    return { loop, renderer, registryPool, sceneFactories };
  }

  function destroy(): void {
    prepared$.complete();
    launched$.complete();
    destroyed$.complete();
    registryPool.destroy();
    sceneFactoriesPool.destroy();
    loop.destroy();
    renderer.destroy();
    scene.destroy();
  }

  return { prepare, launch, destroy, prepared$, launched$, destroyed$ };
}
