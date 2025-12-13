import '@App/style.css';

import sceneConfig from '@App/Scenes/debug-scene.config.json';

import type { IActorWrapper, ICameraWrapper, ILaunchedEngine, ILaunchedScene, IRegistries, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, CameraTag, isNotDefined, launchEngine, SceneLauncher } from '@/Engine';
import { IntersectionsWatcher } from '@Engine/Watchers/IntersectionsWatcher';

const { factories, canvas }: ILaunchedEngine = launchEngine('#app');
const { registries }: ILaunchedScene = SceneLauncher().launch(sceneConfig, canvas, factories);
const { actorRegistry, cameraRegistry }: IRegistries = registries;

// TODO (S.Panfilov) UNDER CONSTRUCTION: intersections START///////////////////////////////////////////
const intersectionsService: IIntersectionsService = IntersectionsWatcher();

const clickableActors: ReadonlyArray<IActorWrapper> = actorRegistry.getAllWithEveryTag([ActorTag.Intersectable]);
const cameraTag: CameraTag = CameraTag.Initial;
const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(cameraTag);

if (isNotDefined(camera)) throw new Error(`Cannot init intersection service: camera with tag "${cameraTag}" is not defined`);

const intersectionsWatcher: IIntersectionsWatcher = intersectionsService.getWatcher(clickableActors, camera, ambientContext.mousePositionWatcher, ambientContext.mouseClicksWatcher);

intersectionsWatcher.value$((obj: IVector3): void => {
  console.log('intersect obj', obj);
});

ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
  console.log('int click:');
});
// TODO (S.Panfilov) UNDER CONSTRUCTION: intersections END/////////////////////////////////////////////
////////////////////////////////////
