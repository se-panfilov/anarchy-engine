import type { TActor, TFsmStates, TModel3d, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import type { AnimationAction } from 'three';
import { Vector3 } from 'three';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceActor.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

enum AnimationActions {
  Idle = 'Idle',
  TPose = 'TPose'
}

const { Idle, TPose } = AnimationActions;

export const spaceActorData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onSpaceReady(space: TSpace, subscriptions?: Record<string, Subscription>): void {
    const fadeDuration = 0.3;

    const solder: TActor = space.services.actorService.getRegistry().getByName('solder_actor_1');

    const { animationsFsm } = solder.states;
    if (isNotDefined(animationsFsm)) throw new Error('[APP]Solder animationsFsm not found');

    const model3d: TModel3d = solder.model3d;
    const actions = space.services.animationsService.startAutoUpdateMixer(model3d).actions;

    const idleAction: AnimationAction = actions[Idle];
    const tPoseAction: AnimationAction = actions[TPose];

    if (isNotDefined(subscriptions)) throw new Error(`[APP] Subscriptions is not defined`);

    // eslint-disable-next-line functional/immutable-data
    subscriptions[config.name] = animationsFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
      switch (state) {
        case Idle:
          tPoseAction.fadeOut(fadeDuration);
          idleAction.reset().fadeIn(fadeDuration).play();
          // eslint-disable-next-line functional/immutable-data
          idleAction.paused = true;
          break;
        case TPose:
          idleAction.fadeOut(fadeDuration);
          tPoseAction.reset().fadeIn(fadeDuration).play();
          break;
        default:
          throw new Error(`Unknown state: ${String(state)}`);
      }
    });
  },
  onChange: (space: TSpace): void => {
    const solder: TActor = space.services.actorService.getRegistry().getByName('solder_actor_1');
    solder.states.animationsFsm?.send$.next(Idle);
    solder.drive.position$.next(new Vector3(-0.5, 0, 0.3));
  },
  onUnload: (_space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    if (isNotDefined(subscriptions)) throw new Error(`[APP] Subscriptions is not defined`);
    subscriptions[config.name].unsubscribe();
  }
};
