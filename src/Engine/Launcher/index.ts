import { CameraTag, LoopTag, RendererTag } from '@Engine/Constants';
import { addToRegistry } from '@Engine/Launcher/AddToRegistry';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import type { IAppCanvas } from '@Engine/Models';
import { initRegistriesAddSubscription } from '@Engine/Pool/GetRegistiryPool';
import type { IFactoriesPool, IRegistriesPool } from '@Engine/Pool/Models';
import type { ICameraWrapper, ILoopWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

export function launchScene(
  sceneConfig: ISceneConfig,
  canvas: IAppCanvas,
  factoriesPool: IFactoriesPool,
  registryPool: IRegistriesPool
): void {
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

  const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main] });

  // TODO (S.Panfilov) intersections
  // const intersectionsService = IntersectionsService();
  //
  // ambientContext.mousePositionWatcher.value$.subscribe((position) => {
  //   const intersectObj: any = intersectionsService.getIntersection(position, cameraRegistry.getByTag(CameraTag.Initial), actorRegistry.);
  //   if (intersectObj) console.log(intersectObj.point);
  // });
  //
  // ambientContext.mouseClicksWatcher.value$.subscribe(({ event }) => click$.next({ position: position$.value, event }));
  ////////////////////////////////////

  const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main, sceneName] });
  const initialCamera: ICameraWrapper = cameraRegistry.getByTag(CameraTag.Initial);
  loop.start(renderer, scene, initialCamera);
}
