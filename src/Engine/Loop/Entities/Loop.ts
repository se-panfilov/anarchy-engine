import { nanoid } from 'nanoid';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, EMPTY, Subject, switchMap } from 'rxjs';

import { LoopTrigger } from '@/Engine/Loop/Constants';
import type { TDelta, TDeltaCalculator, TLoop, TLoopParams, TLoopTriggerFn } from '@/Engine/Loop/Models';
import { enableFPSCounter } from '@/Engine/Loop/Utils';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

import { DeltaCalculator } from './DeltaCalculator';

export function Loop({ name, type, trigger, showDebugInfo }: TLoopParams): TLoop {
  const id: string = `${nanoid()}_${type}`;
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const tick$: Subject<TDelta> = new Subject<TDelta>();

  const isTriggerFn: boolean = typeof trigger === 'function';
  const deltaCalc: TDeltaCalculator = DeltaCalculator(isTriggerFn);

  if (showDebugInfo) enableFPSCounter(tick$);

  const tickSub$: Subscription = enabled$
    .pipe(switchMap((isEnabled: boolean): Subject<TDelta> | Observable<never> => (isEnabled && isTriggerFn ? tick$ : EMPTY)))
    .subscribe((): number | void => (trigger as TLoopTriggerFn)((): void => tick$.next(deltaCalc.update())));

  const runInterval = (): number => setInterval((): void => tick$.next(deltaCalc.update()), trigger as number) as unknown as number;

  let intervalId: number | undefined;

  const enableSub$: Subscription = enabled$.pipe(distinctUntilChanged()).subscribe((isEnabled: boolean): void => {
    if (isEnabled) {
      if (isTriggerFn) {
        tick$.next(0);
      } else {
        intervalId = runInterval();
      }
    } else {
      deltaCalc.reset();
      if (isDefined(intervalId)) clearInterval(intervalId);
    }
  });

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    tickSub$.unsubscribe();
    enableSub$.unsubscribe();

    tick$.complete();
    tick$.unsubscribe();
    enabled$.complete();
    enabled$.unsubscribe();

    if (isDefined(intervalId)) clearInterval(intervalId);

    deltaCalc.destroy();
  });

  return {
    id,
    name,
    tick$,
    type,
    triggerMode: isTriggerFn ? LoopTrigger.Function : LoopTrigger.Interval,
    trigger,
    start: (): void => void enabled$.next(true),
    stop: (): void => void enabled$.next(false),
    enabled$,
    ...destroyable
  };
}
