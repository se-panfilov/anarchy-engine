import './style.css';

import { ActorTag, CameraTag } from '@Engine/Constants';
import { ambientContext } from '@Engine/Context';
import { launchScene } from '@Engine/Launcher';
import sceneConfig from '@Engine/Launcher/debug-scene.config.json';
import type { IAppCanvas } from '@Engine/Models';
import { IVector3 } from '@Engine/Models';
import { getFactoriesPool } from '@Engine/Pool/GetFactoriesPool';
import { getRegistryPool } from '@Engine/Pool/GetRegistiryPool';
import type { IFactoriesPool } from '@Engine/Pool/Models/IFactoriesPool';
import type { IRegistriesPool } from '@Engine/Pool/Models/IRegistriesPool';
import { IntersectionsService } from '@Engine/Services';
import { isNotDefined, isValidSceneConfig } from '@Engine/Utils';
import { IActorWrapper, ICameraWrapper } from '@Engine/Wrappers';

const canvas: IAppCanvas | null = document.querySelector('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
if (!isValidSceneConfig(sceneConfig)) throw new Error('Failed to load a scene: invalid data format');

const registryPool: IRegistriesPool = getRegistryPool();
const factoriesPool: IFactoriesPool = getFactoriesPool({ canvas, cameraRegistry: registryPool.cameraRegistry });
launchScene(sceneConfig, canvas, factoriesPool, registryPool);

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
