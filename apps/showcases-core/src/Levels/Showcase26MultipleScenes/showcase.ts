import type { TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { combineLatest, Observable, Subscription } from 'rxjs';

import type { TAppSettings } from '@/Models';
import { watchResourceLoading } from '@/Utils';

import type { TSubscriptionsData } from './Helpers';
import { runAlpha, runBeta, runDelta, runGamma } from './Helpers';
import { createButtons, createContainersDivs } from './Helpers/Utils';
import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';
import spaceDeltaConfigJson from './spaceDelta.json';
import spaceGammaConfigJson from './spaceGamma.json';

const subscriptionsData: TSubscriptionsData = {
  totalSubscriptions: 0,
  completedSubscriptions: 0,
  subscriptionStacks: new Map<Subscription, string>()
};
hackRxJsSubscriptions(subscriptionsData);

const spaceAlphaConfig: TSpaceConfig = spaceAlphaConfigJson as TSpaceConfig;
const spaceBetaConfig: TSpaceConfig = spaceBetaConfigJson as TSpaceConfig;
const spaceGammaConfig: TSpaceConfig = spaceGammaConfigJson as TSpaceConfig;
const spaceDeltaConfig: TSpaceConfig = spaceDeltaConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  createContainersDivs();

  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceAlphaConfig, spaceBetaConfig, spaceGammaConfig, spaceDeltaConfig], settings.spaceSettings));
  const spaceAlpha: TSpace = spaces[spaceAlphaConfig.name];
  const spaceBeta: TSpace = spaces[spaceBetaConfig.name];
  const spaceGamma: TSpace = spaces[spaceGammaConfig.name];
  const spaceDelta: TSpace = spaces[spaceDeltaConfig.name];
  if (isNotDefined(spaceAlpha)) throw new Error(`Showcase: Space "${spaceAlphaConfig.name}" is not defined`);
  if (isNotDefined(spaceBeta)) throw new Error(`Showcase: Space "${spaceBetaConfig.name}" is not defined`);
  if (isNotDefined(spaceGamma)) throw new Error(`Showcase: Space "${spaceGammaConfig.name}" is not defined`);
  if (isNotDefined(spaceDelta)) throw new Error(`Showcase: Space "${spaceDeltaConfig.name}" is not defined`);

  watchResourceLoading(spaceAlpha);
  watchResourceLoading(spaceBeta);
  watchResourceLoading(spaceDelta);
  watchResourceLoading(spaceGamma);

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

  createButtons('Alpha', leftTopContainerId, spaceAlpha, true, false, subscriptionsData);
  createButtons('Beta', rightTopContainerId, spaceBeta, true, true, subscriptionsData);
  createButtons('Gamma', leftBottomContainerId, spaceGamma, false, false, subscriptionsData);
  createButtons('Delta', rightBottomContainerId, spaceDelta, false, true, subscriptionsData);
}

//Hack RxJS to track subscriptions to prevent memory leaks (DO NOT USE IN PRODUCTION);
function hackRxJsSubscriptions(subscriptionData: TSubscriptionsData): void {
  const originalSubscribe = Observable.prototype.subscribe;
  // eslint-disable-next-line functional/immutable-data
  Observable.prototype.subscribe = function (...args: any[]): any {
    const sub: Subscription & { __aliveInterval?: number } = originalSubscribe.apply(this, args as any);

    // eslint-disable-next-line functional/immutable-data
    subscriptionData.totalSubscriptions = subscriptionData.totalSubscriptions + 1;
    const stackTrace: string = new Error('Subscription created').stack || '';
    subscriptionData.subscriptionStacks.set(sub, stackTrace);

    // (sub as any).__aliveInterval = window.setInterval((): void => {
    //   console.log('alive' + Math.random());
    // }, 5000);

    return sub;
  };

  const originalUnsubscribe = Subscription.prototype.unsubscribe;
  // eslint-disable-next-line functional/immutable-data
  Subscription.prototype.unsubscribe = function (...args: any[]): void {
    if (!this.closed) {
      // eslint-disable-next-line functional/immutable-data
      subscriptionData.completedSubscriptions = subscriptionData.completedSubscriptions + 1;

      const subscription = this as Subscription & { __aliveInterval?: number };
      if (typeof subscription.__aliveInterval === 'number') {
        clearInterval(subscription.__aliveInterval);
        // eslint-disable-next-line functional/immutable-data
        delete (subscription as any).__aliveInterval;
      }

      subscriptionData.subscriptionStacks.delete(this);
    }

    return originalUnsubscribe.apply(this, args as any);
  };
}
