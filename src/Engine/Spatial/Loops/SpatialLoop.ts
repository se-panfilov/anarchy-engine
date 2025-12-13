import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import { LoopType } from '@/Engine/Loop';
import type { TMilliseconds } from '@/Engine/Math';
import { milliseconds } from '@/Engine/Measurements';
import { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';
import type { TSpatialLoop } from '@/Engine/Spatial/Models';

export function SpatialLoop(name: string, loopService: TLoopService, updateRate: TMilliseconds): TSpatialLoop {
  const loop: TLoop = loopService.create({ name, type: LoopType.Spatial, trigger: milliseconds(updateRate) });
  const priority$: BehaviorSubject<SpatialUpdatePriority> = new BehaviorSubject<SpatialUpdatePriority>(SpatialUpdatePriority.ASAP);

  const loopSub$: Subscription = loop.tick$.subscribe((): void => {
    priority$.next(priority$.value === SpatialUpdatePriority.IDLE ? SpatialUpdatePriority.ASAP : priority$.value - 1);
  });

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return { ...loop, priority$ };
}
