import { Clock } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TAppCanvas, TEngine, TMilliseconds, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, isNotDefined, KeysExtra, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { actorService, physicsWorldService } = space.services;
  const { physicalLoop, transformLoop } = space.loops;

  function init(): void {
    physicsWorldService.getDebugRenderer(physicalLoop).start();

    addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

    const actor: TActor | undefined = actorService.getRegistry().findByName('sphere_4_actor');
    if (isNotDefined(actor)) throw new Error('Non-physical actor not found');

    //run/stop physics loop
    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicalLoop.enabled$.next(true));
    keyboardService.onKey(KeysExtra.Space).released$.subscribe((): void => physicalLoop.enabled$.next(false));

    //always running non-physical actor
    const clock: Clock = new Clock();
    transformLoop.tick$.subscribe((): void => {
      const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
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
