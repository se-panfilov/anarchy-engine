import type { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Clock } from 'three';

import type { TActor, TActorRegistry, TActorService, TMilliseconds, TSpace, TSpaceConfig, TTransformLoop } from '@/Engine';
import { asRecord, createDomElement, isNotDefined, spaceService } from '@/Engine';

import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';

const spaceAlphaConfig: TSpaceConfig = spaceAlphaConfigJson as TSpaceConfig;
const spaceBetaConfig: TSpaceConfig = spaceBetaConfigJson as TSpaceConfig;

function createContainersDivs(): void {
  createDomElement('div', undefined, undefined, 'left_container', 'position: fixed; left: 0; right: 50%; top: 0; bottom: 0; outline: none;');
  createDomElement('div', undefined, undefined, 'right_container', 'position: fixed; left: 50%; right: 0; top: 0; bottom: 0; outline: none;');
}

export function start(): void {
  createContainersDivs();
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceAlphaConfig, spaceBetaConfig]));
  const spaceAlpha: TSpace = spaces[spaceAlphaConfig.name];
  const spaceBeta: TSpace = spaces[spaceBetaConfig.name];
  if (isNotDefined(spaceAlpha)) throw new Error(`Showcase: Space "${spaceAlphaConfig.name}" is not defined`);
  if (isNotDefined(spaceBeta)) throw new Error(`Showcase: Space "${spaceBetaConfig.name}" is not defined`);

  combineLatest([spaceAlpha.built$, spaceBeta.built$]).subscribe(([alpha, beta]: ReadonlyArray<TSpace>): void => {
    runAlpha(alpha);
    runBeta(beta);
  });

  addBtn('Start Alpha', (): void => spaceAlpha.start$.next(true));
  addBtn('Stop Alpha', (): void => spaceAlpha.start$.next(false));
  addBtn('Destroy Alpha', (): void => spaceAlpha.destroy$.next());

  addBtn('Start Beta', (): void => spaceBeta.start$.next(true));
  addBtn('Stop Beta', (): void => spaceBeta.start$.next(false));
  addBtn('Destroy Beta', (): void => spaceBeta.destroy$.next());
}

export function runAlpha(space: TSpace): void {
  moveCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  space.start$.next(true);
}

export function runBeta(space: TSpace): void {
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

function addBtn(text: string, cb: (...rest: ReadonlyArray<any>) => void): void {
  const containerId = 'btn-container';

  let container: HTMLDivElement | null = document.querySelector('#' + containerId);
  if (isNotDefined(container)) {
    container = document.createElement('div');
    // eslint-disable-next-line functional/immutable-data
    container.id = containerId;
    // eslint-disable-next-line functional/immutable-data
    container.style.position = 'absolute';
    // eslint-disable-next-line functional/immutable-data
    container.style.top = '10px';
    // eslint-disable-next-line functional/immutable-data
    container.style.right = '10px';
    // eslint-disable-next-line functional/immutable-data
    container.style.display = 'flex';
    // eslint-disable-next-line functional/immutable-data
    container.style.gap = '8px';
    document.body.appendChild(container);
  }

  const button: HTMLButtonElement = document.createElement('button');
  // eslint-disable-next-line functional/immutable-data
  button.textContent = text;

  button.addEventListener('click', cb);
  container.appendChild(button);
}
