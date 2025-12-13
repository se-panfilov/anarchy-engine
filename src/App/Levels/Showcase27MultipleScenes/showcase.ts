import type { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Clock } from 'three';

import type { TActor, TActorRegistry, TActorService, TMilliseconds, TSpace, TSpaceConfig, TTransformLoop } from '@/Engine';
import { asRecord, isNotDefined, spaceService } from '@/Engine';

import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';

const spaceAlphaConfig: TSpaceConfig = spaceAlphaConfigJson as TSpaceConfig;
const spaceBetaConfig: TSpaceConfig = spaceBetaConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceAlphaConfig, spaceBetaConfig]));
  const spaceAlpha: TSpace = spaces[spaceAlphaConfig.name];
  const spaceBeta: TSpace = spaces[spaceBetaConfig.name];
  if (isNotDefined(spaceAlpha)) throw new Error(`Showcase: Space "${spaceAlphaConfig.name}" is not defined`);
  if (isNotDefined(spaceBeta)) throw new Error(`Showcase: Space "${spaceBetaConfig.name}" is not defined`);

  combineLatest([spaceAlpha.built$, spaceBeta.built$]).subscribe((): void => showcase(spaceAlpha));
}

export function showcase(space: TSpace): void {
  switch (space.name) {
    case spaceAlphaConfig.name:
      showcaseAlpha(space);
      break;
    case spaceBetaConfig.name:
      showcaseBeta(space);
      break;
    default:
      throw new Error(`Showcase: Space "${space.name}" is not defined`);
  }
}

export function showcaseAlpha(space: TSpace): void {
  moveCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());

  space.start$.next(true);
}

export function showcaseBeta(space: TSpace): void {
  moveCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());

  space.start$.next(true);
}

function moveCircle(actorName: string, actorService: TActorService, transformLoop: TTransformLoop, clock: Clock): Subscription {
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const actor: TActor | undefined = actorRegistry.findByName(actorName);
  if (isNotDefined(actor)) throw new Error(`Actor "${actorName}" is not defined`);

  return transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    actor.drive.default.setX(Math.sin(elapsedTime) * 8);
    actor.drive.default.setZ(Math.cos(elapsedTime) * 8);
  });
}
