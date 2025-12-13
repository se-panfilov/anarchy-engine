import type { EasingOptions } from 'animejs';
import anime from 'animejs';

import type { IMesh } from '@/Engine';
import { createDeferredPromise } from '@/Engine';

// TODO (S.Panfilov) refactor
interface Position {
  x: number;
  y: number;
  z: number;
}

// TODO (S.Panfilov)  extract
export type IAnimationParams = {
  duration: number;
  direction?: 'alternate' | 'reverse' | 'normal';
  round?: number; //i.g. animation steps (how often to update the value)
  delay?: number;
  endDelay?: number; //i.g. delay after animation
  loop?: boolean;
  easing?: EasingOptions;
};

const defaultAnimationParams: Partial<IAnimationParams> = {
  direction: 'normal',
  round: 0,
  delay: 0,
  endDelay: 0,
  easing: 'linear'
};

// TODO (S.Panfilov) CWP what about delta time?
// Now the value change depends on a frame rate
// add loop.tick$.subscribe((delta) => { ... })
// and do animation.tick(delta)

export function goToPosition(actor: IMesh, targetPosition: Position, params: IAnimationParams): Promise<void> {
  const { promise, resolve } = createDeferredPromise<void>();

  anime({
    targets: actor.position,
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    ...defaultAnimationParams,
    ...params,
    complete: () => resolve()
  });

  return promise;
}
