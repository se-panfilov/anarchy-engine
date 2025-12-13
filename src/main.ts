import './style.css';

import type { IAppCanvas, ISceneLauncher } from '@Engine/Models';
import type { IFactories } from '@Engine/Pool';
import { FactoriesPool } from '@Engine/Pool/FactoriesPool';
import { SceneLauncher } from '@Engine/SceneLauncher';
import sceneConfig from '@Engine/Scenes/debug-scene.config.json';
import { isNotDefined, isValidSceneConfig } from '@Engine/Utils';

const canvas: IAppCanvas | null = document.querySelector('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
if (!isValidSceneConfig(sceneConfig)) throw new Error('Failed to load a scene: invalid data format');
const factories: IFactories = FactoriesPool().pool;
const launcher: ISceneLauncher = SceneLauncher(sceneConfig, canvas, factories);
launcher.launch();

// TODO (S.Panfilov) CWP
// TODO (S.Panfilov) UNDER CONSTRUCTION: intersections START///////////////////////////////////////////
// const intersectionsService = IntersectionsService();
//
// const clickableActors: ReadonlyArray<IActorWrapper> = actorRegistry.getAllWithTag([ActorTag.Intersectable]);
// ambientContext.mousePositionWatcher.value$.subscribe((position) => {
//   const cameraTag: CameraTag = CameraTag.Initial;
//   const camera: ICameraWrapper | undefined = cameraRegistry.getUniqWithTag([cameraTag]);
//   if (isNotDefined(camera))
//     throw new Error(`Cannot init intersection service: camera with tag "${cameraTag}" is not defined`);
//   const intersectObj: IVector3 | undefined = intersectionsService.getIntersection(position, camera, clickableActors);
//   if (intersectObj) {
//     console.log('Intersection: ', (intersectObj as any).point);
//   }
// });
//
// ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
//   console.log('int click:');
// });
// TODO (S.Panfilov) UNDER CONSTRUCTION: intersections END/////////////////////////////////////////////
////////////////////////////////////
