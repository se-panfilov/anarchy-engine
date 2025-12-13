import '@App/style.css';

import levelConfig from '@App/Levels/debug-level.config.json';
import type { IIntersectionsWatcher } from '@Engine/Domains/Intersections';
import { IntersectionsWatcherFactory } from '@Engine/Domains/Intersections';

import type { IActorWrapper, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig, ILoopWrapper, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, buildLevelFromConfig, CameraTag, isNotDefined, LoopTag } from '@/Engine';

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

// TODO (S.Panfilov) experiments with animations
const actor = level.actor.registry.initial.getAllWithSomeTag([ActorTag.Intersectable])[0];
actor.setY(2);
const loop: ILoopWrapper | undefined = level.loop.registry.initial.getUniqByTag(LoopTag.Main);

function moveActor(): void {
  requestAnimationFrame((): void => {
    if (isNotDefined(loop)) throw new Error(`Cannot start the main loop for the level: loop with tag "${LoopTag.Main}" is not defined`);
    const delta: number = loop.delta;
    actor.setX(Math.sin(delta) * 8);
    actor.setZ(Math.cos(delta) * 8);
    moveActor();
  });
}

moveActor();
// TODO (S.Panfilov) END experiments with animations

ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
  console.log('int click:');
});
