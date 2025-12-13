import anime from 'animejs';
import type { Subscription } from 'rxjs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ILoopService, ILoopTimes } from '@/Engine/Domains/Loop';
import type { IWithCoords3 } from '@/Engine/Mixins';
import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { IAnimationParams, IMoverServiceConfig } from '@/Engine/Services/MoverService/Models';
import type { IMoverService } from '@/Engine/Services/MoverService/Models/IMoverService';
import { getGoToPositionAnimation } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { createDeferredPromise } from '@/Engine/Utils';

// TODO (S.Panfilov) should be a service (MoveService) that uses LoopService

export function MoverService(loopService: ILoopService, { suspendWhenDocumentHidden }: IMoverServiceConfig = defaultMoverServiceConfig): IMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  return {
    goToPosition: (actor: IActorWrapper, targetPosition: IWithCoords3, params: IAnimationParams): Promise<void> => {
      const { promise, resolve } = createDeferredPromise();
      const goToPositionAnimation = getGoToPositionAnimation(actor, targetPosition, params, resolve);
      const tickSubscription: Subscription = loopService.tick$.subscribe(({ frameTime }: ILoopTimes): void => {
        // TODO (S.Panfilov) I'm not sure if this makes animation independent from frame rate. Need to test.
        goToPositionAnimation.tick(frameTime); // frameTime, delta, elapsedTime?
      });
      return promise.then(() => tickSubscription.unsubscribe());
    }
  };
}
