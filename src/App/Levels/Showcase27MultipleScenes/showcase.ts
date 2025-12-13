import { combineLatest } from 'rxjs';
import { Clock } from 'three';

import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TActorRegistry, TMilliseconds, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, asRecord, isNotDefined, spaceService } from '@/Engine';

import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';

const spaceAlphaConfig: TSpaceConfig = spaceAlphaConfigJson as TSpaceConfig;
const spaceBetaConfig: TSpaceConfig = spaceBetaConfigJson as TSpaceConfig;

// TODO 14-0-0: Do not allow create spaces with the same name (apply the same for the all entities, add validation)
export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceAlphaConfig, spaceBetaConfig]));
  const spaceAlpha: TSpace = spaces[spaceAlphaConfig.name];
  const spaceBeta: TSpace = spaces[spaceBetaConfig.name];
  if (isNotDefined(spaceAlpha)) throw new Error(`Showcase: Space "${spaceAlphaConfig.name}" is not defined`);
  if (isNotDefined(spaceBeta)) throw new Error(`Showcase: Space "${spaceBetaConfig.name}" is not defined`);

  combineLatest([spaceAlpha.built$, spaceBeta.built$]).subscribe((): void => showcase(spaceAlpha));
}

export function showcase(space: TSpace): void {
  const { actorService } = space.services;
  const { transformLoop } = space.loops;

  const actorRegistry: TActorRegistry = actorService.getRegistry();
  console.log('XXX', space);

  addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

  const actor: TActor | undefined = actorRegistry.findByName('sphere_actor');
  if (isNotDefined(actor)) throw new Error('Actor is not defined');

  const clock: Clock = new Clock();
  transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    actor.drive.default.setX(Math.sin(elapsedTime) * 8);
    actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
  });

  space.start$.next(true);
}
