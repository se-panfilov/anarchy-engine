import '@App/style.css';

import sceneConfig from '@App/Scenes/debug-scene.config.json';
import type { IIntersectionsWatcher } from '@Engine/Domains/Intersections';
import { IntersectionsWatcherFactory } from '@Engine/Domains/Intersections';

import type { IActorWrapper, IAppCanvas, IBuiltGame, ICameraWrapper, ISceneConfig, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, buildGame, CameraTag, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
const game: IBuiltGame = buildGame(sceneConfig as ISceneConfig, canvas);
game.start();

const clickableActors: ReadonlyArray<IActorWrapper> = game.actors.initial.registry.getAllWithEveryTag([ActorTag.Intersectable]);
const cameraTag: CameraTag = CameraTag.Initial;
const camera: ICameraWrapper | undefined = game.camera.initial.registry.getUniqByTag(cameraTag);

if (isNotDefined(camera)) throw new Error(`Cannot init intersection service: camera with tag "${cameraTag}" is not defined`);
const intersectionsWatcher: IIntersectionsWatcher = IntersectionsWatcherFactory().create({ actors: clickableActors, camera, positionWatcher: ambientContext.mousePositionWatcher });

intersectionsWatcher.value$.subscribe((obj: IVector3): void => {
  console.log('intersect obj', obj);
});

intersectionsWatcher.start();

ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
  console.log('int click:');
});
