import type { Subscription } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import { LoopType } from '@/Engine/Loop';
import type { TRenderLoop } from '@/Engine/Space/Models';

export function RenderLoop(name: string, loopService: TLoopService, rendererFn: (cb: FrameRequestCallback) => number): TRenderLoop {
  // TODO 10.0.0. LOOPS: we are forcing to show debug info here
  const loop: TLoop = loopService.createRenderLoop(name, LoopType.Render, rendererFn, true);

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => destroySub$.unsubscribe());

  return loop;
}
