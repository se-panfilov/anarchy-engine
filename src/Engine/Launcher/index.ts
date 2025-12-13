import { ActorTag, CameraTag, LoopTag, RendererTag } from '@Engine/Constants';
import { ambientContext } from '@Engine/Context';
import { addToRegistry } from '@Engine/Launcher/AddToRegistry';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import type { IAppCanvas } from '@Engine/Models';
import { initRegistriesAddSubscription } from '@Engine/Pool/GetRegistiryPool';
import type { IFactoriesPool, IRegistriesPool } from '@Engine/Pool/Models';
import { IntersectionsService } from '@Engine/Services';
import type { ICameraWrapper, ILoopWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';
import type { IVector3 } from '@Engine/Models';

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

  // TODO (S.Panfilov) everything below should be extracted from the launchScene()
  const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main] });

  // TODO (S.Panfilov) intersections
  // const intersectionsService = IntersectionsService();
  //
  // ambientContext.mousePositionWatcher.value$.subscribe((position) => {
  //   const intersectObj: IVector3 | undefined  = intersectionsService.getIntersection(position, cameraRegistry.getByTag(CameraTag.Initial), actorRegistry.getAllWithTag(ActorTag.Intersectable));
  //   if (intersectObj) {
  //     console.log((intersectObj as any).point);
  //   }
  // });

  ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
    console.log('int click:');
  });
  ////////////////////////////////////

  const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main, sceneName] });
  const initialCamera: ICameraWrapper = cameraRegistry.getByTag(CameraTag.Initial);
  loop.start(renderer, scene, initialCamera);
}
