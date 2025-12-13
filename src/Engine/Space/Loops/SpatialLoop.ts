import type { Subscription } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import type { TMilliseconds } from '@/Engine/Math';
import { milliseconds } from '@/Engine/Measurements';
import type { TSpatialLoop } from '@/Engine/Space/Models';

// TODO 10.0.0. LOOPS: this is a placeholder, fix
export function SpatialLoop(loopService: TLoopService, updateRate: TMilliseconds): TSpatialLoop {
  const loop: TLoop = loopService.createIntervalLoop(milliseconds(updateRate));
  const loopSub$: Subscription = loop.tick$.subscribe((): void => console.log('XXX SpatialLoop is running'));

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return loop;
}
