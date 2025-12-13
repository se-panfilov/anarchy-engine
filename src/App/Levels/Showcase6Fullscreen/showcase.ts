import type { TShowcase } from '@/App/Levels/Models';
import type { TActorRegistry, TActorWrapper, TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, screenService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { actorService, loopService, mouseService } = space.services;
  const actorRegistry: TActorRegistry = actorService.getRegistry();

  function init(): void {
    const actor: TActorWrapper | undefined = actorRegistry.findByTag('sphere');
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
