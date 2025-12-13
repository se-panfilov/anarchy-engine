import type { Subscription } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import { milliseconds } from '@/Engine/Measurements';
import type { TCollisionsLoop } from '@/Engine/Space/Models';

// TODO 10.0.0. LOOPS: this is a placeholder, fix
export function CollisionsLoop(loopService: TLoopService): TCollisionsLoop {
  const loop: TLoop = loopService.createIntervalLoop(milliseconds(16));
  const loopSub$: Subscription = loop.tick$.subscribe((): void => console.log('XXX TCollisionsLoop is running'));

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return loop;
}
