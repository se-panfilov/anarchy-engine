import '@App/style.css';

import levelConfig from '@App/Levels/debug-level.config.json';
import type { IIntersectionsWatcher } from '@Engine/Domains/Intersections';
import { IntersectionsWatcherFactory } from '@Engine/Domains/Intersections';

import type { IActorWrapper, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, buildLevelFromConfig, CameraTag, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
level.start();

const clickableActors: ReadonlyArray<IActorWrapper> = level.actor.registry.initial.getAllWithEveryTag([ActorTag.Intersectable]);
const cameraTag: CameraTag = CameraTag.Initial;
const camera: ICameraWrapper | undefined = level.camera.registry.initial.getUniqByTag(cameraTag);

if (isNotDefined(camera)) throw new Error(`Cannot init intersection service: camera with tag "${cameraTag}" is not defined`);
const intersectionsWatcher: IIntersectionsWatcher = IntersectionsWatcherFactory().create({ actors: clickableActors, camera, positionWatcher: ambientContext.mousePositionWatcher });

intersectionsWatcher.value$.subscribe((obj: IVector3): void => {
  console.log('intersect obj', obj);
});

intersectionsWatcher.start();

ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
  console.log('int click:');
});
