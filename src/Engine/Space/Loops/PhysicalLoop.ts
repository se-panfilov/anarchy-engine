import type { Subscription } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import type { TMilliseconds } from '@/Engine/Math';
import { milliseconds } from '@/Engine/Measurements';
import type { TPhysicsWorldService } from '@/Engine/Physics';
import type { TPhysicalLoop } from '@/Engine/Space/Models';

// TODO 10.0.0. LOOPS: add mouse loop?
// TODO 10.0.0. LOOPS: add intersection loop?
// TODO 10.0.0. LOOPS: add transforms loop?
// TODO 10.0.0. LOOPS: add keyboard loop?
// TODO 10.0.0. LOOPS: add text loop?

export function PhysicalLoop(loopService: TLoopService, physicsWorldService: TPhysicsWorldService, updateRate: TMilliseconds): TPhysicalLoop {
  const loop: TLoop = loopService.createIntervalLoop(milliseconds(updateRate));
  const loopSub$: Subscription = loop.tick$.subscribe((): void => physicsWorldService.getWorld()?.step());

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return loop;
}
