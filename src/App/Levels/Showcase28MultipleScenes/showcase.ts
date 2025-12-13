import { combineLatest, Observable, Subscription } from 'rxjs';

import { runBeta } from '@/App/Levels/Showcase28MultipleScenes/Beta';
import { runDelta } from '@/App/Levels/Showcase28MultipleScenes/Delta';
import { runGamma } from '@/App/Levels/Showcase28MultipleScenes/Gamma';
import type { TSpace, TSpaceConfig } from '@/Engine';
import { asRecord, isNotDefined, spaceService } from '@/Engine';

import { runAlpha } from './Alpha';
import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';
import spaceDeltaConfigJson from './spaceDelta.json';
import spaceGammaConfigJson from './spaceGamma.json';
import { createButtons, createContainersDivs } from './Utils';

const subscriptionStacks = new Map<Subscription, string>();
let totalSubscriptions = 0;
let completedSubscriptions = 0;
hackRxJsSubscriptions(subscriptionStacks);

const spaceAlphaConfig: TSpaceConfig = spaceAlphaConfigJson as TSpaceConfig;
const spaceBetaConfig: TSpaceConfig = spaceBetaConfigJson as TSpaceConfig;
const spaceGammaConfig: TSpaceConfig = spaceGammaConfigJson as TSpaceConfig;
const spaceDeltaConfig: TSpaceConfig = spaceDeltaConfigJson as TSpaceConfig;

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

  createButtons('Alpha', leftTopContainerId, spaceAlpha, true, false, totalSubscriptions, completedSubscriptions, subscriptionStacks);
  createButtons('Beta', rightTopContainerId, spaceBeta, true, true, totalSubscriptions, completedSubscriptions, subscriptionStacks);
  createButtons('Gamma', leftBottomContainerId, spaceGamma, false, false, totalSubscriptions, completedSubscriptions, subscriptionStacks);
  createButtons('Delta', rightBottomContainerId, spaceDelta, false, true, totalSubscriptions, completedSubscriptions, subscriptionStacks);
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
