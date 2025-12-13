import type { Subscription } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import type { TRenderLoop } from '@/Engine/Space/Models';

// TODO 10.0.0. LOOPS: this is a placeholder, fix
export function RenderLoop(loopService: TLoopService, rendererFn: (cb: FrameRequestCallback) => number): TRenderLoop {
  // TODO 10.0.0. LOOPS: we  are forcing to show debug info here
  const loop: TLoop = loopService.createRenderLoop(rendererFn, true);
  const loopSub$: Subscription = loop.tick$.subscribe((): void => console.log('XXX RenderLoop is running'));

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return loop;
}
