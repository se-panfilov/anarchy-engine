import type { Subscription } from 'rxjs';

import type { TKinematicLoop } from '@/Engine/Kinematic/Models';
import type { TLoop, TLoopService } from '@/Engine/Loop';
import { LoopType } from '@/Engine/Loop';
import type { TMilliseconds } from '@/Engine/Math';
import { milliseconds } from '@/Engine/Measurements';

export function KinematicLoop(name: string, loopService: TLoopService, updateRate: TMilliseconds): TKinematicLoop {
  const loop: TLoop = loopService.createIntervalLoop(name, LoopType.Kinematic, milliseconds(updateRate));
  const destroySub$: Subscription = loop.destroy$.subscribe((): void => destroySub$.unsubscribe());

  return loop;
}
