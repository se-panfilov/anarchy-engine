import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ActorTag, buildLevelFromConfig, standardLoopService } from '@/Engine';

import levelConfig from './showcase-1-keyboard-and-mouse.json';

//Showcase 11: Keyboard and Mouse
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { actorRegistry } = level.entities;

  async function init(): Promise<void> {
    const actor: IActorWrapperAsync = await actorRegistry.getUniqByTagAsync(ActorTag.Intersectable);
    actor.setY(2);

    standardLoopService.tick$.subscribe(({ elapsedTime }) => {
      actor.setX(Math.sin(elapsedTime) * 8);
      actor.setZ(Math.cos(elapsedTime) * 8);
    });
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
