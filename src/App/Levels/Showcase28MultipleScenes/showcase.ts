import { combineLatest, Observable, Subscription } from 'rxjs';
import { Clock } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TSpace, TSpaceConfig } from '@/Engine';
import { asRecord, createDomElement, isDefined, isNotDefined, spaceService } from '@/Engine';

import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';

const subscriptionStacks = new Map<Subscription, string>();
let totalSubscriptions = 0;
let completedSubscriptions = 0;
hackRxJsSubscriptions(subscriptionStacks);

const spaceAlphaConfig: TSpaceConfig = spaceAlphaConfigJson as TSpaceConfig;
const spaceBetaConfig: TSpaceConfig = spaceBetaConfigJson as TSpaceConfig;

function createContainersDivs(): void {
  createDomElement('div', undefined, undefined, 'left_container', 'position: fixed; left: 0; right: calc(50% + 2px); top: 0; bottom: 0; outline: none; background: oklab(0.91 -0.13 0.05)');
  createDomElement('div', undefined, undefined, 'right_container', 'position: fixed; left: calc(50% + 2px); right: 0; top: 0; bottom: 0; outline: none; background: oklab(0.89 -0.08 -0.05);');
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

  const leftContainerId = 'btn-container-left';
  const rightContainerId = 'btn-container-right';

  addBtn('Start Alpha', leftContainerId, (): void => spaceAlpha.start$.next(true), 'calc(50% + 4px)');
  addBtn('Stop Alpha', leftContainerId, (): void => spaceAlpha.start$.next(false));
  addBtn('Destroy Alpha', leftContainerId, (): void => destroySpace((): void => spaceAlpha.destroy$.next()));
  addBtn('Drop Alpha', leftContainerId, (): void => destroySpace((): void => spaceAlpha.drop()));

  addBtn('Start Beta', rightContainerId, (): void => spaceBeta.start$.next(true), '4px');
  addBtn('Stop Beta', rightContainerId, (): void => spaceBeta.start$.next(false));
  addBtn('Destroy Beta', rightContainerId, (): void => destroySpace((): void => spaceBeta.destroy$.next()));
  addBtn('Drop Beta', rightContainerId, (): void => destroySpace((): void => spaceBeta.drop()));
}

export function runAlpha(space: TSpace): void {
  moveByCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  space.start$.next(true);
}

export function runBeta(space: TSpace): void {
  moveByCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  space.start$.next(true);
}

function addBtn(text: string, containerId: string, cb: (...rest: ReadonlyArray<any>) => void, right?: string, left?: string): void {
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
    if (isDefined(right)) container.style.right = right;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(left)) container.style.left = left;
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

//Hack RxJS to track subscriptions to prevent memory leaks (DO NOT USE IN PRODUCTION);
function hackRxJsSubscriptions(subscriptionStacks: Map<Subscription, string>): void {
  const originalSubscribe = Observable.prototype.subscribe;
  // eslint-disable-next-line functional/immutable-data
  Observable.prototype.subscribe = function (...args: any[]): any {
    const sub: Subscription & { __aliveInterval?: number } = originalSubscribe.apply(this, args as any);

    totalSubscriptions++;
    const stackTrace: string = new Error('Subscription created').stack || '';
    subscriptionStacks.set(sub, stackTrace);

    // (sub as any).__aliveInterval = window.setInterval((): void => {
    //   console.log('alive' + Math.random());
    // }, 5000);

    return sub;
  };

  const originalUnsubscribe = Subscription.prototype.unsubscribe;
  // eslint-disable-next-line functional/immutable-data
  Subscription.prototype.unsubscribe = function (...args: any[]): void {
    if (!this.closed) {
      completedSubscriptions++;

      const subscription = this as Subscription & { __aliveInterval?: number };
      if (typeof subscription.__aliveInterval === 'number') {
        clearInterval(subscription.__aliveInterval);
        // eslint-disable-next-line functional/immutable-data
        delete (subscription as any).__aliveInterval;
      }

      subscriptionStacks.delete(this);
    }

    return originalUnsubscribe.apply(this, args as any);
  };
}

function destroySpace(cb: () => void, shouldLogStack: boolean = false): void {
  console.log('Subscriptions before destroy:', totalSubscriptions);
  console.log('Cleaning up...');
  cb();

  setTimeout(() => console.log(`Completed: ${completedSubscriptions}`), 1000);
  setTimeout(() => console.log(`Active: ${totalSubscriptions - completedSubscriptions}`), 1100);
  if (shouldLogStack) setTimeout(() => console.log(subscriptionStacks), 1200);
}
