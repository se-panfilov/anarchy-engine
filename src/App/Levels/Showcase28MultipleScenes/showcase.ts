import { combineLatest, Observable, Subscription } from 'rxjs';
import { Clock } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TActor, TActorRegistry, TKeyboardPressingEvent, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
import { asRecord, createDomElement, isDefined, isNotDefined, KeyCode, metersPerSecond, mpsSpeed, spaceService } from '@/Engine';

import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';
import spaceDeltaConfigJson from './spaceDelta.json';
import spaceGammaConfigJson from './spaceGamma.json';

const subscriptionStacks = new Map<Subscription, string>();
let totalSubscriptions = 0;
let completedSubscriptions = 0;
hackRxJsSubscriptions(subscriptionStacks);

const spaceAlphaConfig: TSpaceConfig = spaceAlphaConfigJson as TSpaceConfig;
const spaceBetaConfig: TSpaceConfig = spaceBetaConfigJson as TSpaceConfig;
const spaceGammaConfig: TSpaceConfig = spaceGammaConfigJson as TSpaceConfig;
const spaceDeltaConfig: TSpaceConfig = spaceDeltaConfigJson as TSpaceConfig;

function createContainersDivs(): void {
  createDomElement(
    'div',
    undefined,
    undefined,
    'left_top_container',
    'position: fixed; left: 0; right: calc(50% + 2px); top: 0; bottom: calc(50% + 2px); outline: none; background: oklab(0.91 -0.13 0.05)'
  );
  createDomElement(
    'div',
    undefined,
    undefined,
    'right_top_container',
    'position: fixed; left: calc(50% + 2px); right: 0; top: 0; bottom: calc(50% + 2px); outline: none; background: oklab(0.89 -0.08 -0.05);'
  );
  createDomElement(
    'div',
    undefined,
    undefined,
    'left_bottom_container',
    'position: fixed; left: 0; right: calc(50% + 2px); top: calc(50% + 2px); bottom: 0; outline: none; background: oklab(0.81 0.11 -0.1)'
  );
  createDomElement(
    'div',
    undefined,
    undefined,
    'right_bottom_container',
    'position: fixed; left: calc(50% + 2px); right: 0; top: calc(50% + 2px); bottom: 0; outline: none; background: oklab(0.79 0 -0.11)'
  );
}

export function start(): void {
  createContainersDivs();
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceAlphaConfig, spaceBetaConfig, spaceGammaConfig, spaceDeltaConfig]));
  const spaceAlpha: TSpace = spaces[spaceAlphaConfig.name];
  const spaceBeta: TSpace = spaces[spaceBetaConfig.name];
  const spaceGamma: TSpace = spaces[spaceGammaConfig.name];
  const spaceDelta: TSpace = spaces[spaceDeltaConfig.name];
  if (isNotDefined(spaceAlpha)) throw new Error(`Showcase: Space "${spaceAlphaConfig.name}" is not defined`);
  if (isNotDefined(spaceBeta)) throw new Error(`Showcase: Space "${spaceBetaConfig.name}" is not defined`);
  if (isNotDefined(spaceBeta)) throw new Error(`Showcase: Space "${spaceGamma.name}" is not defined`);
  if (isNotDefined(spaceBeta)) throw new Error(`Showcase: Space "${spaceDelta.name}" is not defined`);

  combineLatest([spaceAlpha.built$, spaceBeta.built$, spaceGamma.built$, spaceDelta.built$]).subscribe(([alpha, beta, gamma, delta]: ReadonlyArray<TSpace>): void => {
    runAlpha(alpha);
    runBeta(beta);
    runGamma(gamma);
    runDelta(delta);
  });

  const leftTopContainerId = 'btn-container-left-top';
  const rightTopContainerId = 'btn-container-right-top';
  const leftBottomContainerId = 'btn-container-left-bottom';
  const rightBottomContainerId = 'btn-container-right-bottom';

  addBtn('Start Alpha', leftTopContainerId, (): void => spaceAlpha.start$.next(true), 'calc(50% + 4px)');
  addBtn('Stop Alpha', leftTopContainerId, (): void => spaceAlpha.start$.next(false));
  addBtn('Destroy Alpha', leftTopContainerId, (): void => destroySpace((): void => spaceAlpha.destroy$.next()));
  addBtn('Drop Alpha', leftTopContainerId, (): void => destroySpace((): void => spaceAlpha.drop()));

  addBtn('Start Beta', rightTopContainerId, (): void => spaceBeta.start$.next(true), '4px');
  addBtn('Stop Beta', rightTopContainerId, (): void => spaceBeta.start$.next(false));
  addBtn('Destroy Beta', rightTopContainerId, (): void => destroySpace((): void => spaceBeta.destroy$.next()));
  addBtn('Drop Beta', rightTopContainerId, (): void => destroySpace((): void => spaceBeta.drop()));

  addBtn('Start Gamma', leftBottomContainerId, (): void => spaceGamma.start$.next(true), 'calc(50% + 4px)', undefined, 'calc(50% + 14px)');
  addBtn('Stop Gamma', leftBottomContainerId, (): void => spaceGamma.start$.next(false));
  addBtn('Destroy Gamma', leftBottomContainerId, (): void => destroySpace((): void => spaceGamma.destroy$.next()));
  addBtn('Drop Gamma', leftBottomContainerId, (): void => destroySpace((): void => spaceGamma.drop()));

  addBtn('Start Delta', rightBottomContainerId, (): void => spaceDelta.start$.next(true), '4px', undefined, 'calc(50% + 14px)');
  addBtn('Stop Delta', rightBottomContainerId, (): void => spaceDelta.start$.next(false));
  addBtn('Destroy Delta', rightBottomContainerId, (): void => destroySpace((): void => spaceDelta.destroy$.next()));
  addBtn('Drop Delta', rightBottomContainerId, (): void => destroySpace((): void => spaceDelta.drop()));
}

export function runAlpha(space: TSpace): void {
  moveByCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  driveByKeyboard('move_actor_left', space.services);
  space.start$.next(true);
}

export function runBeta(space: TSpace): void {
  moveByCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  space.start$.next(true);
}
export function runGamma(space: TSpace): void {
  moveByCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  space.start$.next(true);
}

export function runDelta(space: TSpace): void {
  moveByCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  space.start$.next(true);
}

function addBtn(text: string, containerId: string, cb: (...rest: ReadonlyArray<any>) => void, right?: string, left?: string, top?: string): void {
  let container: HTMLDivElement | null = document.querySelector('#' + containerId);
  if (isNotDefined(container)) {
    container = document.createElement('div');
    // eslint-disable-next-line functional/immutable-data
    container.id = containerId;
    // eslint-disable-next-line functional/immutable-data
    container.style.position = 'absolute';
    // eslint-disable-next-line functional/immutable-data
    container.style.top = top ?? '10px';
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

function driveByKeyboard(actorName: string, { actorService, keyboardService }: TSpaceServices): void {
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const actor: TActor | undefined = actorRegistry.findByName(actorName);
  if (isNotDefined(actor)) throw new Error(`Actor "${actorName}" is not defined`);

  const { onKey } = keyboardService;

  onKey(KeyCode.W).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actor.drive.default.addZ(mpsSpeed(metersPerSecond(-10), delta)));
  onKey(KeyCode.A).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actor.drive.default.addX(mpsSpeed(metersPerSecond(-10), delta)));
  onKey(KeyCode.S).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actor.drive.default.addZ(mpsSpeed(metersPerSecond(10), delta)));
  onKey(KeyCode.D).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actor.drive.default.addX(mpsSpeed(metersPerSecond(10), delta)));
}

function destroySpace(cb: () => void, shouldLogStack: boolean = false): void {
  console.log('Subscriptions before destroy:', totalSubscriptions);
  console.log('Cleaning up...');
  cb();

  setTimeout(() => console.log(`Completed: ${completedSubscriptions}`), 1000);
  setTimeout(() => console.log(`Active: ${totalSubscriptions - completedSubscriptions}`), 1100);
  if (shouldLogStack) setTimeout(() => console.log(subscriptionStacks), 1200);
}
