import type { Subscription } from 'rxjs';

import type { TKinematicLoop } from '@/Engine/Kinematic/Models';
import type { TLoop, TLoopService } from '@/Engine/Loop';
import type { TMilliseconds } from '@/Engine/Math';
import { milliseconds } from '@/Engine/Measurements';

export function KinematicLoop(loopService: TLoopService, updateRate: TMilliseconds): TKinematicLoop {
  const loop: TLoop = loopService.createIntervalLoop(milliseconds(updateRate));
  const destroySub$: Subscription = loop.destroy$.subscribe((): void => destroySub$.unsubscribe());

  return loop;
}
