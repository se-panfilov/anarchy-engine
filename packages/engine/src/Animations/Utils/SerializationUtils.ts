import type { TAnimationStateParams } from '@Engine/Animations/Models';
import { isDefined } from '@Engine/Utils';
import type { AnimationAction } from 'three';

export function applyAnimationActionProperties(action: AnimationAction, { enabled, weight, loop, repetitions, clampWhenFinished, timeScale, time, paused }: TAnimationStateParams): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(enabled)) action.enabled = enabled;
  if (isDefined(weight)) action.setEffectiveWeight(weight);
  if (isDefined(loop) && isDefined(repetitions)) action.setLoop(loop, repetitions);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(clampWhenFinished)) action.clampWhenFinished = clampWhenFinished;
  if (isDefined(timeScale)) action.setEffectiveTimeScale(timeScale);

  action.reset();

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(time)) action.time = time;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(paused)) action.paused = paused;

  const isLeadAnimation: boolean = action.enabled && action.time > 0 && action.weight > 0.5;
  if (isLeadAnimation) action.play();
}
