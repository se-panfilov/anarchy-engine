import type { TShowcase } from '@/App/Levels/Models';
import type { TActorAsyncRegistry, TActorWrapperAsync, TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, mouseService, screenService } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { actorService, loopService } = space.services;
  const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();

  async function init(): Promise<void> {
    const actor: TActorWrapperAsync | undefined = await actorRegistry.findByTagAsync('sphere');
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
