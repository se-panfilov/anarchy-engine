import anime from 'animejs';
import type { Subscription } from 'rxjs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ILoopTimes, ILoopWrapper } from '@/Engine/Domains/Loop';
import type { IWithCoords3 } from '@/Engine/Mixins';
import { defaultAnimationParams } from '@/Engine/Services/MoverService/Constants';
import type { IAnimationParams } from '@/Engine/Services/MoverService/Models';
import { createDeferredPromise } from '@/Engine/Utils';

// TODO (S.Panfilov) CWP what about delta time?
// Now the value change depends on a frame rate
// add loop.tick$.subscribe((delta) => { ... })
// and do animation.tick(delta)

export function goToPosition(actor: IActorWrapper, targetPosition: IWithCoords3, params: IAnimationParams, loop: ILoopWrapper): Promise<void> {
  const { promise, resolve } = createDeferredPromise<void>();

  const tickSubscription: Subscription = loop.tick$.subscribe(({ frameTime }: ILoopTimes): void => {
    // TODO (S.Panfilov) I'm not sure if this makes animation independent from frame rate. Need to test.
    animation.tick(frameTime); // frameTime, delta, elapsedTime?
  });

  const animation = anime({
    targets: actor.entity.position,
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    ...defaultAnimationParams,
    ...params,
    autoplay: false,
    complete: (): void => {
      tickSubscription.unsubscribe();
      resolve();
    }
  });

  return promise;
}
