import { Clock } from 'three';

import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TMilliseconds, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, isNotDefined, KeysExtra, spaceService } from '@/Engine';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { actorService, keyboardService, physicsWorldService } = space.services;
  const { physicalLoop, transformLoop } = space.loops;

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

  space.start$.next(true);
}
