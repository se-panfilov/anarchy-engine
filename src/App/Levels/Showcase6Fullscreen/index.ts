import type { IShowcase } from '@/App/Levels/Models';
import type { IActorAsyncRegistry, IActorWrapperAsync, IAppCanvas, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, isNotDefined, mouseService, screenService } from '@/Engine';

import spaceConfig from './showcase-6.json';

//Showcase 6: Go fullscreen
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { actorService, loopService } = space.services;
  const actorRegistry: IActorAsyncRegistry = actorService.getRegistry();

  async function init(): Promise<void> {
    const actor: IActorWrapperAsync | undefined = await actorRegistry.findByTagAsync('sphere');
    if (isNotDefined(actor)) throw new Error('Actor not found');
    actor.setY(2);

    mouseService.clickLeftRelease$.subscribe(() => {
      void screenService.toggleFullScreen();
    });

    loopService.tick$.subscribe(({ elapsedTime }) => {
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
