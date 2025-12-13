import anime from 'animejs';
import type { Subscription } from 'rxjs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ILoopService, ILoopTimes } from '@/Engine/Domains/Loop';
import type { IWithCoords3 } from '@/Engine/Mixins';
import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { IAnimationParams, IMoveFn, IMoverServiceConfig } from '@/Engine/Services/MoverService/Models';
import type { IMoverService } from '@/Engine/Services/MoverService/Models/IMoverService';
import { goStraightMove } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { createDeferredPromise } from '@/Engine/Utils';

export function MoverService(loopService: ILoopService, { suspendWhenDocumentHidden }: IMoverServiceConfig = defaultMoverServiceConfig): IMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  function performMove(moveFn: IMoveFn, actor: IActorWrapper, { x, y, z }: Partial<IWithCoords3>, params: IAnimationParams): Promise<void> {
    const { promise, resolve } = createDeferredPromise();
    const targetPosition: IWithCoords3 = { x: x ?? actor.getX(), y: y ?? actor.getY(), z: z ?? actor.getZ() };
    const move = moveFn(actor, targetPosition, params, resolve);
    const tickSubscription: Subscription = loopService.tick$.subscribe(({ frameTime }: ILoopTimes): void => {
      // TODO (S.Panfilov) CWP what about delta time?
      // TODO (S.Panfilov) I'm not sure if this makes animation independent from frame rate. Need to test.
      move.tick(frameTime); // frameTime, delta, elapsedTime?
    });
    return promise.then(() => tickSubscription.unsubscribe());
  }

  return {
    goToPosition: (actor: IActorWrapper, targetPosition: Partial<IWithCoords3>, params: IAnimationParams): Promise<void> => performMove(goStraightMove, actor, targetPosition, params)
  };
}
