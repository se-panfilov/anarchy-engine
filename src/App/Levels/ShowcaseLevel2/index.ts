import type { IActorParams, IActorWrapper, IAppCanvas, ICameraWrapper, IIntersectionsWatcher, ILevel, ILevelConfig, IVector3 } from '@/Engine';
import { ActorTag, ActorType, ambientContext, buildLevelFromConfig, CameraTag, IntersectionsWatcherFactory, isNotDefined, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-level-1.config.json';

export function showcaseLevel2(canvas: IAppCanvas): void {
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

  // START Experiment1: animations ---------------
  level.actor.factory.initial.create({
    type: ActorType.cube,
    position: Vector3Wrapper({ x: 0, y: 3, z: 0 }).entity,
    castShadow: true,
    materialParams: { color: '#5177ff' },
    tags: [ActorTag.Intersectable]
  } satisfies IActorParams);
  // // END Experiment1: animations ---------------
}
