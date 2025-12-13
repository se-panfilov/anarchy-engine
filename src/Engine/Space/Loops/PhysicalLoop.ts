import type { Subscription } from 'rxjs';
import { filter } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import { milliseconds } from '@/Engine/Measurements';
import type { TPhysicsWorldService } from '@/Engine/Physics';
import type { TPhysicalLoop } from '@/Engine/Space/Models';

// TODO 10.0.0. LOOPS: add mouse loop?
// TODO 10.0.0. LOOPS: add intersection loop?
// TODO 10.0.0. LOOPS: add transforms loop?
// TODO 10.0.0. LOOPS: add keyboard loop?

// TODO 10.0.0. LOOPS: do we need TPhysicsLoopService? Perhaps rename physicsLoopService to something else
export function PhysicalLoop(loopService: TLoopService, physicsWorldService: TPhysicsWorldService): TPhysicalLoop {
  // TODO 10.0.0. LOOPS: mock interval(16)
  const loop: TLoop = loopService.createIntervalLoop(milliseconds(16));
  const loopSub$: Subscription = loop.tick$
    // TODO 10.0.0. LOOPS: How to detect if autoupdate? (e.g. physicsLoopService.autoUpdate$.value)
    .pipe(filter((): boolean => true))
    .subscribe((): void => physicsWorldService.getWorld()?.step());

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return loop;
}
