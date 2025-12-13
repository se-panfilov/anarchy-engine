import { nanoid } from 'nanoid';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, EMPTY, Subject, switchMap, takeWhile, withLatestFrom } from 'rxjs';

import { CollisionsUpdatePriority } from '@/Engine';
import { LoopTrigger } from '@/Engine/Loop/Constants';
import type { TDelta, TDeltaCalculator, TLoop, TLoopParams, TLoopTriggerFn } from '@/Engine/Loop/Models';
import { enableFPSCounter } from '@/Engine/Loop/Utils';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

import { DeltaCalculator } from './DeltaCalculator';

// TODO 10.0.0. LOOPS: Refactor Loop to use web workers to prevent suppression of setInterval (and etc) in background tabs
export function Loop({ name, type, trigger, showDebugInfo, maxPriority }: TLoopParams): TLoop {
  const id: string = `${nanoid()}_${type}`;
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const tick$: Subject<TDelta> = new Subject<TDelta>();
  const initialPriority: number = maxPriority ?? CollisionsUpdatePriority.ASAP;
  const priority$: BehaviorSubject<number> = new BehaviorSubject<number>(initialPriority);

  const isTriggerFn: boolean = typeof trigger === 'function';
  const deltaCalc: TDeltaCalculator = DeltaCalculator(isTriggerFn);

  if (showDebugInfo) enableFPSCounter(tick$);

  const loopSub$: Subscription = tick$
    .pipe(
      takeWhile((): boolean => maxPriority !== undefined),
      withLatestFrom(priority$)
    )
    .subscribe(([, priority]: [TMilliseconds, number]): void => priority$.next(priority === 0 ? initialPriority : priority - 1));

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
    loopSub$.unsubscribe();

    tick$.complete();
    tick$.unsubscribe();
    enabled$.complete();
    enabled$.unsubscribe();
    priority$.complete();
    priority$.unsubscribe();

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
    priority$,
    ...destroyable
  };
}
