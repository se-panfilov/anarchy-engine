import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ISpace, ISpaceConfig } from '@/Engine';
import { buildLevelFromConfig, mouseService, screenService, standardLoopService } from '@/Engine';

import spaceConfig from './showcase-7-fullscreen.config.json';

//Showcase 6: Go fullscreen
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ISpace = buildLevelFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { actorRegistry } = level.entities;

  async function init(): Promise<void> {
    const actor: IActorWrapperAsync = await actorRegistry.findByTagAsync('sphere');
    actor.setY(2);

    mouseService.clickLeftRelease$.subscribe(() => {
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
