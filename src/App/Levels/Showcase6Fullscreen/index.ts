import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapperAsync, IAppCanvas, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, mouseService, screenService, standardLoopService } from '@/Engine';

import spaceConfig from './showcase-7-fullscreen.config.json';

//Showcase 6: Go fullscreen
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { actorRegistry } = space.entities;

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
    space.start();
    void init();
  }

  return { start, space };
}
