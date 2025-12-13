import type { Subscription } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import type { TRenderLoop } from '@/Engine/Space/Models';

// TODO 10.0.0. LOOPS: this is a placeholder, fix
export function RenderLoop(loopService: TLoopService): TRenderLoop {
  const loop: TLoop = loopService.createRenderLoop();
  const loopSub$: Subscription = loop.tick$.subscribe((): void => console.log('XXX RenderLoop is running'));

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return loop;
}
