import type { TShowcase } from '@/App/Levels/Models';
import type { TActorWrapperAsync, TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, KeysExtra } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { actorService, loopService, physicsWorldService, physicsLoopService } = space.services;

  async function init(): Promise<void> {
    physicsWorldService.getDebugRenderer(loopService).start();

    const actor: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('actor_6');
    if (isNotDefined(actor)) throw new Error('Non-physical actor not found');

    //run/stop physics loop
    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicsLoopService.shouldAutoUpdate(true));
    keyboardService.onKey(KeysExtra.Space).released$.subscribe((): void => physicsLoopService.shouldAutoUpdate(false));

    //always running non-physical actor
    loopService.tick$.subscribe(({ elapsedTime }): void => {
      actor.setX(Math.sin(elapsedTime) * 4);
      actor.setZ(Math.cos(elapsedTime) * 4);
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
