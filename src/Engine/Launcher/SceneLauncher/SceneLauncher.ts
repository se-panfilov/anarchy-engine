import type { ICameraWrapper } from '@Engine/Domains/Camera';
import { CameraTag } from '@Engine/Domains/Camera';
import type { ILoopWrapper } from '@Engine/Domains/Loop';
import { LoopTag } from '@Engine/Domains/Loop';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import { RendererTag } from '@Engine/Domains/Renderer';
import type { ISceneConfig, ISceneWrapper } from '@Engine/Domains/Scene';
import type { ISceneLauncher } from '@Engine/Launcher';
import type { IAppCanvas, ILaunchedScene } from '@Engine/Models';
import type { IDestroyableFactories, ILocalFactoryPool, IRegistryPool } from '@Engine/Pool';
import { RegistryPool } from '@Engine/Pool';
import { LocalFactoriesPool } from '@Engine/Pool/LocalFactoriesPool';
import type { IFactories, IRegistries } from '@Engine/Pool/Models';
import { addFromConfigToRegistry, isNotDefined, isValidSceneConfig } from '@Engine/Utils';
import { BehaviorSubject } from 'rxjs';

// TODO (S.Panfilov) CWP All factories (especially wrapper's) don't care about entity registration, but they should
// Registries should be created automatically and dynamically added to pools

export function SceneLauncher(): ISceneLauncher {
  const prepared$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const launched$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  let registryPool: IRegistryPool;
  let localFactoriesPool: ILocalFactoryPool;
  let localFactories: IDestroyableFactories;
  let registries: IRegistries;
  let scene: ISceneWrapper;
  let renderer: IRendererWrapper;
  let loop: ILoopWrapper;

  function prepare(canvas: IAppCanvas): void {
    registryPool = RegistryPool();
    registries = registryPool.pool;
    localFactoriesPool = LocalFactoriesPool({ canvas, cameraRegistry: registries.cameraRegistry });
    localFactories = localFactoriesPool.pool;
    prepared$.next(true);
  }

  function launch(sceneConfig: ISceneConfig, canvas: IAppCanvas, factories: IFactories): ILaunchedScene {
    if (!isValidSceneConfig(sceneConfig)) throw new Error('Failed to launch a scene: invalid data format');
    const { name: sceneName, actors, cameras, lights, controls, tags: sceneTags } = sceneConfig;
    if (!prepared$.value) prepare(canvas);

    const { actorFactory, cameraFactory, lightFactory, rendererFactory, sceneFactory, loopFactory } = factories;
    const { actorRegistry, cameraRegistry, lightRegistry, controlsRegistry } = registries;
    const { controlsFactory } = localFactories;
    scene = sceneFactory.create({ name: sceneName, tags: sceneTags });

    registryPool.startAddSubscription(scene);

    addFromConfigToRegistry(actors, actorFactory, actorRegistry);
    addFromConfigToRegistry(cameras, cameraFactory, cameraRegistry);
    addFromConfigToRegistry(lights, lightFactory, lightRegistry);
    addFromConfigToRegistry(controls, controlsFactory, controlsRegistry);

    const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main] });

    const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main] });
    const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Initial);
    if (isNotDefined(initialCamera)) throw new Error(`Cannot start the main loop for the scene ${sceneName}: initial camera is not defined`);
    loop.start(renderer, scene, initialCamera);

    launched$.next(true);
    return { loop, renderer, registries, factories: localFactories };
  }

  function destroy(): void {
    prepared$.complete();
    launched$.complete();
    destroyed$.complete();
    registryPool.destroy();
    localFactoriesPool.destroy();
    loop.destroy();
    renderer.destroy();
    scene.destroy();
  }

  return { prepare, launch, destroy, prepared$, launched$, destroyed$ };
}
