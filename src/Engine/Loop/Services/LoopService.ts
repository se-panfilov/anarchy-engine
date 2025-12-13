import type { Subscription } from 'rxjs';
import Stats from 'stats.js';

import { Loop } from '@/Engine/Loop/Entities/Loop';
import type { TLoop, TLoopService } from '@/Engine/Loop/Models';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function LoopService(): TLoopService {
  let debugInfoSub$: Subscription | undefined;

  // TODO 10.0.0. LOOPS: Maybe add factory/registries flow here?
  function enableFPSCounter(loop: TLoop): Subscription {
    // TODO DEBUG: make stats enable/disable configurable via url params (?debug=true)
    const stats: any = new Stats();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    document.body.appendChild(stats.dom);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return loop.tick$.subscribe((): void => void stats.end());
  }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    debugInfoSub$?.unsubscribe();
    destroySub$.unsubscribe();
  });

  return {
    // You can optionally pass a "requestAnimationFrame" function you want (e.g. window.requestAnimationFrame, display.requestAnimationFrame for VR, etc.)
    createRenderLoop: (fn: (cb: FrameRequestCallback) => number = requestAnimationFrame, showDebugInfo: boolean = false): TLoop => {
      const loop: TLoop = Loop(fn);
      if (showDebugInfo) debugInfoSub$ = enableFPSCounter(loop);
      return loop;
    },
    createIntervalLoop: (interval: TMilliseconds): TLoop => Loop(interval),
    ...destroyable
  };
}
