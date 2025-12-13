import { ActorTag, CameraTag, LoopTag, RendererTag } from '@Engine/Constants';
import { ambientContext } from '@Engine/Context';
import { addToRegistry } from '@Engine/Launcher/AddToRegistry';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import type { IAppCanvas, IVector3 } from '@Engine/Models';
import { initRegistriesAddSubscription } from '@Engine/Pool/GetRegistiryPool';
import type { IFactoriesPool, IRegistriesPool } from '@Engine/Pool/Models';
import { IntersectionsService } from '@Engine/Services';
import { isNotDefined } from '@Engine/Utils';
import type { IActorWrapper, ICameraWrapper, ILoopWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';

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

  // TODO (S.Panfilov) CWP
  // TODO (S.Panfilov) UNDER CONSTRUCTION: intersections START///////////////////////////////////////////
  const intersectionsService = IntersectionsService();

  ambientContext.mousePositionWatcher.value$.subscribe((position) => {
    const cameraTag: CameraTag = CameraTag.Initial;
    const camera: ICameraWrapper | undefined = cameraRegistry.getUniqWithTag([cameraTag]);
    if (isNotDefined(camera))
      throw new Error(`Cannot init intersection service: camera with tag "${cameraTag}" is not defined`);
    const actors: ReadonlyArray<IActorWrapper> = actorRegistry.getAllWithTag([ActorTag.Intersectable]);
    console.log(actors);
    const intersectObj: IVector3 | undefined = intersectionsService.getIntersection(position, camera, actors);
    if (intersectObj) {
      console.log('Intersection: ', (intersectObj as any).point);
    }
  });

  ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
    console.log('int click:');
  });
  // TODO (S.Panfilov) UNDER CONSTRUCTION: intersections END/////////////////////////////////////////////
  ////////////////////////////////////

  const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main] });
  const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqWithTag([CameraTag.Initial]);
  if (isNotDefined(initialCamera))
    throw new Error(`Cannot start the main loop for the scene ${sceneName}: initial camera is not defined`);
  loop.start(renderer, scene, initialCamera);
}
