import type { IActorWrapper, IAppCanvas, ILevel, ILevelConfig, ILoopWrapper, IVector3 } from '@/Engine';
import { ActorTag, ambientContext, buildLevelFromConfig, isNotDefined, LoopTag } from '@/Engine';

import levelConfig from './showcase-level-1.config.json';

export function showcaseLevel1(canvas: IAppCanvas): void {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  level.start();

  console.log(level);
  level.intersectionsWatcher.registry.initial.getAll()[0].value$.subscribe((obj: IVector3): void => {
    console.log('intersect obj', obj);
  });

  ambientContext.mouseClickWatcher.value$.subscribe((): void => {
    console.log('int click:');
  });

  // START Experiment1: animations ---------------
  const actor: IActorWrapper = level.actor.registry.initial.getAllWithSomeTag([ActorTag.Intersectable])[0];
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
}
