import type { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Clock } from 'three';

import type { TActor, TActorRegistry, TActorService, TMilliseconds, TSpace, TSpaceConfig, TTransformLoop } from '@/Engine';
import { asRecord, isDefined, isNotDefined, spaceService } from '@/Engine';

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

  addSpaceSwitcher((): void => nextSpace([spaceAlpha, spaceBeta]));
}

let currentSpaceId: string | undefined = undefined;

export function showcase(space: TSpace): void {
  switch (space.name) {
    case spaceAlphaConfig.name:
      runAlpha(space);
      break;
    case spaceBetaConfig.name:
      runBeta(space);
      break;
    default:
      throw new Error(`Showcase: Space "${space.name}" is not defined`);
  }

  currentSpaceId = space.id;
  space.start$.next(true);
}

export function runAlpha(space: TSpace): void {
  moveCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
}

export function runBeta(space: TSpace): void {
  moveCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());
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

function addSpaceSwitcher(cb: (...rest: ReadonlyArray<any>) => void): void {
  const button: HTMLButtonElement = document.createElement('button');
  // eslint-disable-next-line functional/immutable-data
  button.textContent = 'Switch Space';
  // eslint-disable-next-line functional/immutable-data
  button.style.position = 'absolute';
  // eslint-disable-next-line functional/immutable-data
  button.style.top = '10px';
  // eslint-disable-next-line functional/immutable-data
  button.style.right = '10px';
  button.addEventListener('click', cb);
  document.body.appendChild(button);
}

function nextSpace(spaces: ReadonlyArray<TSpace>): void {
  const currIdx: number = isDefined(currentSpaceId) ? spaces.findIndex((s: TSpace): boolean => s.id === currentSpaceId) : 0;
  const nextIdx: number = currIdx >= spaces.length ? 0 : currIdx + 1;

  console.log('XXX', currIdx, nextIdx);

  const currSpace: TSpace = spaces[currIdx];
  const nextSpace: TSpace = spaces[nextIdx];
  currSpace.start$.next(false);
  nextSpace.start$.next(true);
  currentSpaceId = nextSpace.id;
}
