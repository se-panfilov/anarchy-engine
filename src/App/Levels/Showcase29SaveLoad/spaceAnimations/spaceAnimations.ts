import { BehaviorSubject } from 'rxjs';
import type { AnimationAction, AnimationClip, AnimationMixer } from 'three';
import { LoopOnce } from 'three';

import type { TActor, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { addAwait, getContainer, removeAwait } from '../utils';
import spaceConfig from './spaceAnimations.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

enum AnimationActions {
  Idle = 'Idle',
  Run = 'Run'
}

const fadeDuration = 0.3;

const { Idle, Run } = AnimationActions;

// TODO 15-0-0: Test separately loaded animation
export const spaceAnimationsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onSpaceReady(space: TSpace): void {
    initSolder1('solder_actor_1', space);
  },
  onChange: (space: TSpace): void => {
    addAwait('onChange', spaceAnimationsData.awaits$);
    changeSolder1('solder_actor_1', space);
    removeAwait('onChange', spaceAnimationsData.awaits$);
  }
};

function initSolder1(actorName: string, space: TSpace): void {
  const solder: TActor | undefined = space.services.actorService.getRegistry().findByName(actorName);
  if (isNotDefined(solder)) throw new Error(`[Showcase]: Can't create actor: "${actorName}": not found`);

  const actions = space.services.animationsService.startAutoUpdateMixer(solder.model3d).actions;

  const idleAction: AnimationAction = actions[Idle];
  const runAction: AnimationAction = actions[Run];

  runAction.fadeOut(fadeDuration);
  idleAction.reset().fadeIn(fadeDuration).play();
  // eslint-disable-next-line functional/immutable-data
  idleAction.paused = true;
}

function changeSolder1(actorName: string, space: TSpace): void {
  const solder: TActor | undefined = space.services.actorService.getRegistry().findByName(actorName);
  if (isNotDefined(solder)) throw new Error(`[Showcase]: Can't update actor: "${actorName}": not found`);

  const idleAction: AnimationAction = solder.model3d.actions[Idle];
  const runAction: AnimationAction = solder.model3d.actions[Run];

  idleAction.fadeOut(fadeDuration);
  playAnimationUntilFrame(solder.model3d.getMixer(), runAction, 15, 30);
}

export function playAnimationUntilFrame(mixer: AnimationMixer, action: AnimationAction, targetFrame: number, animationFps: number = 30, step: number = 1 / 60, maxSteps: number = 10000): void {
  const clip: AnimationClip = action.getClip();
  const duration: number = clip.duration;
  const targetTime: number = targetFrame / animationFps;

  if (targetTime > duration) {
    console.warn(`[Showcase]: Target frame ${targetFrame} exceeds clip duration (${duration}s). Will clamp.`);
  }

  action.reset();
  action.setLoop(LoopOnce, 0);
  // eslint-disable-next-line functional/immutable-data
  action.clampWhenFinished = true;
  // eslint-disable-next-line functional/immutable-data
  action.enabled = true;
  action.play();

  mixer.update(0);

  let steps: number = 0;
  // eslint-disable-next-line functional/no-loop-statements
  while (action.time < targetTime && steps < maxSteps) {
    mixer.update(step);
    steps++;
  }

  // eslint-disable-next-line functional/immutable-data
  action.time = Math.min(targetTime, duration);
  mixer.update(0);
  // eslint-disable-next-line functional/immutable-data
  action.paused = true;

  if (steps >= maxSteps) {
    console.warn('[Showcase]: playAnimationUntilFrame: Reached max steps, animation may not be complete.');
  }
}
