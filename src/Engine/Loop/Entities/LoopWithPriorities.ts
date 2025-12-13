import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TLoop, TLoopParams, TLoopWithPriority } from '@/Engine/Loop/Models';
import { isNotDefined } from '@/Engine/Utils';

import { Loop } from './Loop';

export function LoopWithMaxPriority({ name, type, trigger, showDebugInfo, maxPriority }: TLoopParams): TLoopWithPriority {
  const loop: TLoop = Loop({ name, type, trigger, showDebugInfo });
  if (isNotDefined(maxPriority)) throw new Error('LoopWithMaxPriority: maxPriority must be defined');

  const priority$: BehaviorSubject<number> = new BehaviorSubject<number>(maxPriority);

  const loopSub$: Subscription = loop.tick$.subscribe((): void => {
    priority$.next(priority$.value === 0 ? maxPriority : priority$.value - 1);
  });

  const destroySub$: Subscription = loop.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return {
    ...loop,
    priority$
  };
}
