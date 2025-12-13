import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import type { AnimationAction } from 'three';
import { Vector3 } from 'three';

import type { TActor, TFsmStates, TModel3d, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceAnimations.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

enum AnimationActions {
  Idle = 'Idle',
  Run = 'Run'
}

const { Idle, Run } = AnimationActions;

export const spaceAnimationsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  onSpaceReady(space: TSpace, subscriptions?: Record<string, Subscription>): void {
    const fadeDuration = 0.3;

    const solder: TActor | undefined = space.services.actorService.getRegistry().findByName('solder_actor_1');
    if (isNotDefined(solder)) throw new Error('[Showcase]: Solder actor not found');

    const { animationsFsm } = solder.states;
    if (isNotDefined(animationsFsm)) throw new Error('[Showcase]:Solder animationsFsm not found');

    const model3d: TModel3d = solder.model3d;
    const actions = space.services.animationsService.startAutoUpdateMixer(model3d).actions;

    const idleAction: AnimationAction = actions[Idle];
    const runAction: AnimationAction = actions[Run];

    if (isNotDefined(subscriptions)) throw new Error(`[Showcase]: Subscriptions is not defined`);

    // eslint-disable-next-line functional/immutable-data
    subscriptions[config.name] = animationsFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
      switch (state) {
        case Idle:
          runAction.fadeOut(fadeDuration);
          idleAction.reset().fadeIn(fadeDuration).play();
          break;
        case Run:
          idleAction.fadeOut(fadeDuration);
          runAction.reset().fadeIn(fadeDuration).play();
          // eslint-disable-next-line functional/immutable-data
          runAction.paused = true;
          break;
        default:
          throw new Error(`Unknown state: ${String(state)}`);
      }
    });
  },
  onChange: (space: TSpace): void => {
    const solder: TActor | undefined = space.services.actorService.getRegistry().findByName('solder_actor_1');
    if (isNotDefined(solder)) throw new Error('[Showcase]: Solder actor not found');

    solder.states.animationsFsm?.send$.next(Run);
    solder.drive.position$.next(new Vector3(-0.5, 0, 0.3));
  },
  onUnload: (_space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    if (isNotDefined(subscriptions)) throw new Error(`[Showcase]: Subscriptions is not defined`);
    subscriptions[config.name].unsubscribe();
  }
};
