import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TAppCanvas, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, isNotDefined, KeysExtra, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { actorService, loopService, physicsWorldService } = space.services;
  const { physicalLoop } = space.loops;

  function init(): void {
    physicsWorldService.getDebugRenderer(loopService).start();

    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });

    const actor: TActor | undefined = actorService.getRegistry().findByName('sphere_4_actor');
    if (isNotDefined(actor)) throw new Error('Non-physical actor not found');

    //run/stop physics loop
    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicalLoop.enabled$.next(true));
    keyboardService.onKey(KeysExtra.Space).released$.subscribe((): void => physicalLoop.enabled$.next(false));

    //always running non-physical actor
    loopService.tick$.subscribe(({ elapsedTime }): void => {
      actor.drive.default.setX(Math.sin(elapsedTime) * 4);
      actor.drive.default.setZ(Math.cos(elapsedTime) * 4);
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
