import type { IShowcase } from '@/App/Levels/Models';
import type { IActorAsyncRegistry, IActorWrapperAsync, IAppCanvas, IEngine, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, mouseService, screenService } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const engine: IEngine = Engine(space);
  const { loopService } = engine.services;

  const { actorService } = space.services;
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
    engine.start();
    void init();
  }

  return { start, space };
}
