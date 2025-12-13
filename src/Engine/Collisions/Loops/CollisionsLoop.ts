import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';
import type { TCollisionsLoop } from '@/Engine/Collisions/Models';
import type { TLoop, TLoopService } from '@/Engine/Loop';
import { LoopType } from '@/Engine/Loop';
import type { TMilliseconds } from '@/Engine/Math';
import { milliseconds } from '@/Engine/Measurements';

export function CollisionsLoop(name: string, loopService: TLoopService, updateRate: TMilliseconds): TCollisionsLoop {
  const loop: TLoop = loopService.create({ name, type: LoopType.Collisions, trigger: milliseconds(updateRate) });
  const priority$: BehaviorSubject<CollisionsUpdatePriority> = new BehaviorSubject<CollisionsUpdatePriority>(CollisionsUpdatePriority.ASAP);

  const loopSub$: Subscription = loop.tick$.subscribe((): void => {
    priority$.next(priority$.value === CollisionsUpdatePriority.IDLE ? CollisionsUpdatePriority.ASAP : priority$.value - 1);
  });

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return { ...loop, priority$ };
}
