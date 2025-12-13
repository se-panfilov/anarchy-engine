import '@App/style.css';

import sceneConfig from '@App/Scenes/debug-scene.config.json';

import type { IActorWrapper, ICameraWrapper, IIntersectionsService, IIntersectionsWatcher, ILaunchedEngine, ILaunchedScene, IRegistries, IVector3 } from '@/Engine';
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

if (isNotDefined(camera)) throw new Error(`Cannot init intersection service: camera with tag "${cameraTag}" is not defined`);

const intersectionsWatcher: IIntersectionsWatcher = intersectionsService.getWatcher(clickableActors, camera, ambientContext.mousePositionWatcher, ambientContext.mouseClicksWatcher);

intersectionsWatcher.onIntersect((obj: IVector3): void => {
  console.log('intersect obj', obj);
});

ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
  console.log('int click:');
});
// TODO (S.Panfilov) UNDER CONSTRUCTION: intersections END/////////////////////////////////////////////
////////////////////////////////////
