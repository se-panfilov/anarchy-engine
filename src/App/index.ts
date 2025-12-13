import '@App/style.css';

import levelConfig from '@App/Levels/debug-level.config.json';
import type { IIntersectionsWatcher } from '@Engine/Domains/Intersections';
import { IntersectionsWatcherFactory } from '@Engine/Domains/Intersections';

import type { IActorParams, IActorWrapper, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig, ILoopWrapper, IVector3 } from '@/Engine';
import { ActorTag, ActorType, ambientContext, buildLevelFromConfig, CameraTag, isNotDefined, LoopTag, Vector3Wrapper } from '@/Engine';

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

// START Experiment1: animations ---------------
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
// END Experiment1: animations ---------------

// START Experiment1: animations ---------------
level.actor.factory.initial.create({
  type: ActorType.cube,
  position: Vector3Wrapper({ x: 2, y: 2, z: 2 }).entity,
  castShadow: true,
  tags: [ActorTag.Intersectable]
} satisfies IActorParams);
// END Experiment1: animations ---------------

ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
  console.log('int click:');
});
