import type { Subscription } from 'rxjs';
import Stats from 'stats.js';

import type { TLoopRegistry, TModels3dFactory } from '@/Engine';
import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import { LoopType } from '@/Engine/Loop/Constants';
import { Loop } from '@/Engine/Loop/Entities/Loop';
import type { TLoop, TLoopService } from '@/Engine/Loop/Models';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TRenderLoop } from '@/Engine/Space';
import type { TSpatialLoop } from '@/Engine/Spatial';

export function LoopService(): TLoopService {
  let debugInfoSub$: Subscription | undefined;
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TLoop): void => registry.add(wrapper));
  const create = (params: TLoopParams): TLoop => factory.create(params);

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

  // TODO CWP
  // TODO 10.0.0. LOOPS: implement getLoop (we need a registry and etc)
  function getLoop(name: string | undefined, type: LoopType): TLoop | never {
    // If no name is provided, return the main loop
    // otherwise, return the loop with the specified name or throw an error
    throw new Error(`LoopService: No loop with name "${name}" found`);
  }

  return {
    // You can optionally pass a "requestAnimationFrame" function you want (e.g. window.requestAnimationFrame, display.requestAnimationFrame for VR, etc.)
    createRenderLoop: (name: string, type: LoopType, fn: (cb: FrameRequestCallback) => number = requestAnimationFrame, showDebugInfo: boolean = false): TLoop => {
      const loop: TLoop = Loop(name, type, fn);
      if (showDebugInfo) debugInfoSub$ = enableFPSCounter(loop);
      return loop;
    },
    createIntervalLoop: (name: string, type: LoopType, interval: TMilliseconds): TLoop => Loop(name, type, interval),
    getLoop,
    getCollisionsLoop: (name?: string): TCollisionsLoop | never => getLoop(name, LoopType.Collisions) as TCollisionsLoop,
    getKinematicLoop: (name?: string): TKinematicLoop | never => getLoop(name, LoopType.Kinematic),
    getPhysicalLoop: (name?: string): TPhysicalLoop | never => getLoop(name, LoopType.Physical),
    getRenderLoop: (name?: string): TRenderLoop | never => getLoop(name, LoopType.Render),
    getSpatialLoop: (name?: string): TSpatialLoop | never => getLoop(name, LoopType.Spatial) as TSpatialLoop,
    getFactory: (): TLoopFactory => factory,
    getRegistry: (): TLoopRegistry => registry,
    ...destroyable
  };
}
