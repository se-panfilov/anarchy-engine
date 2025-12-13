import { Clock } from 'three';

import { addGizmo } from '@/Levels/Utils';
import type { TActor, TMilliseconds, TSpace, TSpaceConfig } from '@engine';
import { asRecord, isNotDefined, KeysExtra, spaceService } from '@engine';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { actorService, keyboardService, physicsWorldService } = space.services;
  const { physicsLoop, transformLoop } = space.loops;

  physicsWorldService.getDebugRenderer(physicsLoop).start();
  physicsLoop.enabled$.next(false);

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  //run/stop physics loop
  keyboardService.onKey(KeysExtra.Space).pressed$.subscribe((): void => physicsLoop.enabled$.next(true));
  keyboardService.onKey(KeysExtra.Space).released$.subscribe((): void => physicsLoop.enabled$.next(false));

  const actor: TActor = actorService.getRegistry().getByName('sphere_4_actor');

  //always running non-physics actor
  const clock: Clock = new Clock();
  transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    actor.drive.default.setX(Math.sin(elapsedTime) * 4);
    actor.drive.default.setZ(Math.cos(elapsedTime) * 4);
  });

  space.start$.next(true);
}
