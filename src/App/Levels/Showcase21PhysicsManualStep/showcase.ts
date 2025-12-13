import { Clock } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TEngine, TMilliseconds, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, isNotDefined, KeysExtra, spaceService } from '@/Engine';

import spaceConfigJson from './showcase.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function showcase(): TShowcase {
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;
  const { actorService, physicsWorldService } = space.services;
  const { physicalLoop, transformLoop } = space.loops;

  function init(): void {
    physicsWorldService.getDebugRenderer(physicalLoop).start();
    physicalLoop.enabled$.next(false);

    addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

    //run/stop physics loop
    keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicalLoop.enabled$.next(true));
    keyboardService.onKey(KeysExtra.Space).released$.subscribe((): void => physicalLoop.enabled$.next(false));

    const actor: TActor | undefined = actorService.getRegistry().findByName('sphere_4_actor');
    if (isNotDefined(actor)) throw new Error('Non-physical actor not found');

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
