import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, IIntersectionsWatcher, ILevel, ILevelConfig, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, buildLevelFromConfig, CommonTag, isNotDefined, LookUpStrategy, standardLoopService } from '@/Engine';

import levelConfig from './showcase-1-moving-actors.config.json';

//Showcase 1: Moving actor with intersections & reading data from config
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { intersectionsWatcherRegistry, actorRegistry } = level.entities;

  function start(): void {
    level.start();

    //START: just debug
    const intersectionsWatcher: IIntersectionsWatcher | undefined = intersectionsWatcherRegistry.getUniqByTag(CommonTag.FromConfig);
    if (isNotDefined(intersectionsWatcher)) throw new Error(`Cannot get "intersectionsWatcher" with tag "${CommonTag.FromConfig}"`);
    intersectionsWatcher.value$.subscribe((obj: IVector3): void => {
      console.log('intersect obj', obj);
    });

    ambientContext.mouseClickWatcher.value$.subscribe((): void => {
      console.log('int click:');
    });
    //END: just debug

    const actor: IActorWrapper = actorRegistry.getAllByTags([ActorTag.Intersectable], LookUpStrategy.Some)[0];
    actor.setY(2);

    standardLoopService.tick$.subscribe(({ elapsedTime }) => {
      actor.setX(Math.sin(elapsedTime) * 8);
      actor.setZ(Math.cos(elapsedTime) * 8);
    });
  }

  return { start, level };
}
