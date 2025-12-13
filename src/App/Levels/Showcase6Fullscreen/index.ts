import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, screenService, standardLoopService } from '@/Engine';

import levelConfig from './showcase-7-fullscreen.config.json';

//Showcase 6: Go fullscreen
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { actorRegistry } = level.entities;

  async function init(): Promise<void> {
    const actor: IActorWrapper = await actorRegistry.getUniqByTagAsync('sphere');
    actor.setY(2);

    ambientContext.mouseClickWatcher.value$.subscribe(() => {
      void screenService.toggleFullScreen();
    });

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
