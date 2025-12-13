import '@App/style.css';

import sceneConfig from '@App/Scenes/debug-scene.config.json';

import type { IActorWrapper, ICameraWrapper, IIntersectionsService, ILaunchedEngine, ILaunchedScene, IMousePosition, IRegistries, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, CameraTag, IntersectionsService, isNotDefined, launchEngine, SceneLauncher } from '@/Engine';

const { factories, canvas }: ILaunchedEngine = launchEngine('#app');
const { registries }: ILaunchedScene = SceneLauncher().launch(sceneConfig, canvas, factories);
const { actorRegistry, cameraRegistry }: IRegistries = registries;

// TODO (S.Panfilov) CWP
// TODO (S.Panfilov) UNDER CONSTRUCTION: intersections START///////////////////////////////////////////
const intersectionsService: IIntersectionsService = IntersectionsService();

const clickableActors: ReadonlyArray<IActorWrapper> = actorRegistry.getAllWithTag([ActorTag.Intersectable]);
const cameraTag: CameraTag = CameraTag.Initial;
const camera: ICameraWrapper | undefined = cameraRegistry.getUniqWithTag([cameraTag]);

ambientContext.mousePositionWatcher.value$.subscribe((position: IMousePosition) => {
  if (isNotDefined(camera)) throw new Error(`Cannot init intersection service: camera with tag "${cameraTag}" is not defined`);
  const intersectObj: IVector3 | undefined = intersectionsService.getIntersection(position, camera, clickableActors);
  if (intersectObj) {
    console.log('Intersection: ', (intersectObj as any).point);
  }
});

ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
  console.log('int click:');
});
// TODO (S.Panfilov) UNDER CONSTRUCTION: intersections END/////////////////////////////////////////////
////////////////////////////////////
