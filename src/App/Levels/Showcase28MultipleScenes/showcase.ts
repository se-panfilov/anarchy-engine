import { combineLatest, Observable, Subscription } from 'rxjs';
import { Clock } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TSpace, TSpaceConfig } from '@/Engine';
import { asRecord, createDomElement, isDefined, isNotDefined, spaceService } from '@/Engine';

import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';

const tracked = new Map<Subscription, { sub: Subscription; stack: string }>();
let untrackedSubscriptionsCount: number = 0;
hackRxJsSubscriptions(tracked);

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
  addBtn('Destroy Alpha', leftContainerId, (): void => {
    console.log('Subscriptions before destroy:', tracked.size);
    console.log('Cleaning up...');
    spaceAlpha.destroy$.next();

    setTimeout(() => console.log(`Alive subscriptions after destroy (without (${untrackedSubscriptionsCount}) untracked): ${tracked.size - untrackedSubscriptionsCount}`), 1000);
    setTimeout(() => console.log(tracked), 1000);
  });

  addBtn('Start Beta', rightContainerId, (): void => spaceBeta.start$.next(true), '4px');
  addBtn('Stop Beta', rightContainerId, (): void => spaceBeta.start$.next(false));
  addBtn('Destroy Beta', rightContainerId, (): void => {
    console.log('Subscriptions before destroy:', tracked.size);
    console.log('Cleaning up...');
    spaceBeta.destroy$.next();
    setTimeout(() => console.log('Subscriptions after destroy:', tracked.size), 1000);
  });
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

function hackRxJsSubscriptions(tracked: Map<Subscription, { sub: Subscription; stack: any }>): void {
  //Hack RxJS to track subscriptions to prevent memory leaks (DO NOT USE IN PRODUCTION);
  const originalUnsubscribe = Subscription.prototype.unsubscribe;

  // eslint-disable-next-line functional/immutable-data
  Subscription.prototype.unsubscribe = function (): void {
    if (tracked.has(this)) tracked.delete(this);
    return originalUnsubscribe.apply(this);
  };

  const originalSubscribe = Observable.prototype.subscribe;

  // eslint-disable-next-line functional/immutable-data
  Observable.prototype.subscribe = function (...args: any[]): Subscription {
    const stack: string = new Error('Subscription created here').stack ?? '[no stack]';
    const subscription: Subscription = originalSubscribe.apply(this, args as any);

    if (!tracked.has(subscription)) tracked.set(subscription, { sub: subscription, stack });

    const originalUnsubscribe = subscription.unsubscribe.bind(subscription);
    // eslint-disable-next-line functional/immutable-data
    subscription.unsubscribe = (): void => {
      if (tracked.has(subscription)) {
        tracked.delete(subscription);
      } else {
        untrackedSubscriptionsCount++;
      }
      return originalUnsubscribe();
    };

    return subscription;
  };
}
