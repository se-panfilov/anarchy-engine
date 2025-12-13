import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, IIntersectionsWatcher, ILevel, ILevelConfig, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, buildLevelFromConfig, CommonTag, isNotDefined } from '@/Engine';

import levelConfig from './showcase-level-1.config.json';

//Showcase 3: Moving actor with intersections & reading data from config
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

    const actor: IActorWrapper = actorRegistry.getAllWithSomeTag([ActorTag.Intersectable])[0];
    actor.setY(2);
    const loop: ILoopWrapper | undefined = loopRegistry.getUniqByTag(LoopTag.Main);

    function moveActor(): void {
      //normally we should not use requestAnimationFrame outside of the loop
      requestAnimationFrame((): void => {
        if (isNotDefined(loop)) throw new Error(`Cannot start the main loop for the level: loop with tag "${LoopTag.Main}" is not defined`);
        const delta: number = loop.delta;
        actor.setX(Math.sin(delta) * 8);
        actor.setZ(Math.cos(delta) * 8);
        moveActor();
      });
    }

    moveActor();
  }

  return { start, level };
}
