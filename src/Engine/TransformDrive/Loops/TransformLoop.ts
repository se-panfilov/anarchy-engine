import type { Subscription } from 'rxjs';

import type { TLoop, TLoopService } from '@/Engine/Loop';
import { LoopType } from '@/Engine/Loop';
import type { TMilliseconds } from '@/Engine/Math';
import { milliseconds } from '@/Engine/Measurements';
import type { TTransformLoop } from '@/Engine/TransformDrive/Models';

export function TransformLoop(name: string, loopService: TLoopService, updateRate: TMilliseconds): TTransformLoop {
  const loop: TLoop = loopService.create({ name, type: LoopType.Transform, trigger: milliseconds(updateRate) });

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => destroySub$.unsubscribe());

  return loop;
}
