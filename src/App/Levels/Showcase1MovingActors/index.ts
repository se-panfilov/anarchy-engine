import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, ICameraWrapper, IIntersectionsWatcher, ILevel, ILevelConfig, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, buildLevelFromConfig, CameraTag, intersectionsService, isNotDefined, LookUpStrategy, standardLoopService } from '@/Engine';

import levelConfig from './showcase-1-moving-actors.config.json';

//Showcase 1: Moving actor with intersections & reading data from config
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { actorRegistry, cameraRegistry } = level.entities;

  async function init(): Promise<void> {
    const actor: IActorWrapper = await actorRegistry.getUniqByTagAsync(ActorTag.Intersectable);
    actor.setY(2);

    standardLoopService.tick$.subscribe(({ elapsedTime }) => {
      actor.setX(Math.sin(elapsedTime) * 8);
      actor.setZ(Math.cos(elapsedTime) * 8);
    });
  }

  // TODO (S.Panfilov) CWP intersections doesn't work

  function startIntersections(): void {
    const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Initial);
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    const actors: ReadonlyArray<IActorWrapper> = actorRegistry.getAllByTags([ActorTag.Intersectable], LookUpStrategy.Every);

    const intersectionsWatcher: IIntersectionsWatcher = intersectionsService.start(actors, camera);
    intersectionsWatcher.value$.subscribe((obj: IVector3): void => {
      console.log('intersect obj', obj);
    });

    ambientContext.mouseClickWatcher.value$.subscribe((): void => {
      console.log('int click:');
    });
  }

  function start(): void {
    level.start();
    void init();
    startIntersections();
  }

  return { start, level };
}
