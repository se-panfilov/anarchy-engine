import type { EasingOptions } from 'animejs';
import anime from 'animejs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import { createDeferredPromise } from '@/Engine/Utils/AsyncUtils';
import { ILoopWrapper } from '@/Engine';

// TODO (S.Panfilov) should be a service (MoveService) that uses LoopService

let loop: ILoopWrapper;
// TODO (S.Panfilov) debug
export function setLoopForMoveUtils(loopWrapper: ILoopWrapper): void {
  loop = loopWrapper;
}

// TODO (S.Panfilov) should be configurable
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
(anime as any).suspendWhenDocumentHidden = false; // If "true" - do not pause animation when document is hidden (i.g. when user switches to another tab)

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

export function goToPosition(actor: IActorWrapper, targetPosition: Position, params: IAnimationParams): Promise<void> {
  const { promise, resolve } = createDeferredPromise<void>();

  const animation = anime({
    targets: actor.entity.position,
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    ...defaultAnimationParams,
    ...params,
    complete: (): void => resolve()
  });

  // loop.tick$.subscribe((delta: number): void => {
  //   console.log('tick');
  //   animation.tick(delta);
  // });

  return promise;
}
