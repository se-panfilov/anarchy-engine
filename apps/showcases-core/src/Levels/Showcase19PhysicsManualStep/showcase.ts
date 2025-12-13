import type { TActor, TMilliseconds, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { KeyCode, spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { Clock } from 'three';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { actorService, keyboardService, physicsWorldService } = space.services;
  const { physicsLoop, transformLoop } = space.loops;

  physicsWorldService.getDebugRenderer(physicsLoop).start();
  physicsLoop.enabled$.next(false);

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  //run/stop physics loop
  keyboardService.onKey(KeyCode.Space).pressed$.subscribe((): void => physicsLoop.enabled$.next(true));
  keyboardService.onKey(KeyCode.Space).released$.subscribe((): void => physicsLoop.enabled$.next(false));

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
