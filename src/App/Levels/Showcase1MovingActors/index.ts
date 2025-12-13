import { filter } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ICameraWrapper, IIntersectionEvent, IIntersectionsWatcher, ILevel, ILevelConfig } from '@/Engine';
import { ActorTag, buildLevelFromConfig, intersectionsService, isNotDefined, mouseService, standardLoopService } from '@/Engine';

import levelConfig from './showcase-1-moving-actors.config.json';

//Showcase 1: Moving actor with intersections & reading data from config
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { actorRegistry, cameraRegistry } = level.entities;

  async function init(): Promise<void> {
    const actor: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync(ActorTag.Intersectable);
    actor.setY(2);

    standardLoopService.tick$.subscribe(({ elapsedTime }) => {
      actor.setX(Math.sin(elapsedTime) * 8);
      actor.setZ(Math.cos(elapsedTime) * 8);
    });
  }

  function startIntersections(): void {
    const camera: ICameraWrapper | undefined = cameraRegistry.getActiveCamera();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    // const actors: ReadonlyArray<IActorWrapperAsync> = actorRegistry.getAllByTags([ActorTag.Intersectable], LookUpStrategy.Every);
    const intersectionsWatcher: IIntersectionsWatcher = intersectionsService.buildWatcher(camera);

    actorRegistry.added$.pipe(filter((a: IActorWrapperAsync) => a.hasTag(ActorTag.Intersectable))).subscribe((actor: IActorWrapperAsync): void => intersectionsWatcher.addActor(actor));

    intersectionsWatcher.value$.subscribe((obj: IIntersectionEvent): void => {
      console.log('intersect obj', obj);
    });

    mouseService.clickLeftRelease$.subscribe((): void => {
      console.log('int click:');
    });

    intersectionsWatcher.start();
  }

  function start(): void {
    level.start();
    void init();
    startIntersections();
  }

  return { start, level };
}
