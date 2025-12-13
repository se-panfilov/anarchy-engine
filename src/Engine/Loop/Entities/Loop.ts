import { nanoid } from 'nanoid';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, EMPTY, Subject, switchMap, takeWhile } from 'rxjs';

import type { LoopUpdatePriority } from '@/Engine/Loop/Constants';
import { LoopTrigger, LoopWorkerActions, MaxTicks } from '@/Engine/Loop/Constants';
import type { TDelta, TDeltaCalculator, TLoop, TLoopParams, TLoopTriggerFn, TLoopWorkerResponseData, TLoopWorkerStartRequestData, TLoopWorkerStopRequestData } from '@/Engine/Loop/Models';
import { enableFPSCounter } from '@/Engine/Loop/Utils';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isDefined, isNotDefined } from '@/Engine/Utils';

import { DeltaCalculator } from './DeltaCalculator';

export function Loop({ name, type, trigger, showDebugInfo, maxPriority, isParallelMode }: TLoopParams): TLoop | never {
  const id: string = `${nanoid()}_${type}`;
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const tick$: Subject<TDelta> = new Subject<TDelta>();
  let tickCounter: number = 0;

  let worker: Worker | null = null;
  const isTriggerFn: boolean = typeof trigger === 'function';
  if (isParallelMode && isTriggerFn) throw new Error('Loop: Trigger function is not supported in parallel mode, only interval is supported');

  const deltaCalc: TDeltaCalculator | null = isParallelMode ? null : DeltaCalculator(isTriggerFn);

  if (showDebugInfo) enableFPSCounter(tick$);

  if (isParallelMode) {
    worker = new Worker(new URL('./Loop.worker.ts', import.meta.url), { type: 'module' });
    // eslint-disable-next-line functional/immutable-data
    worker.onmessage = ({ data }: MessageEvent<TLoopWorkerResponseData>): void => tick$.next(data.delta);
  }

  const loopSub$: Subscription = tick$.pipe(takeWhile((): boolean => maxPriority !== undefined)).subscribe((): void => {
    tickCounter = (tickCounter + 1) % MaxTicks;
  });

  function shouldUpdateWithPriority(priority: LoopUpdatePriority): boolean {
    const period: number = 1 << priority;
    return (tickCounter & (period - 1)) === 0;
  }

  const tickSub$: Subscription = enabled$
    .pipe(switchMap((isEnabled: boolean): Subject<TDelta> | Observable<never> => (isEnabled && !isParallelMode && isTriggerFn ? tick$ : EMPTY)))
    .subscribe((): number | void => (trigger as TLoopTriggerFn)((): void => tick$.next(deltaCalc!.update())));

  const runInterval = (): number | never => {
    if (isParallelMode || isNotDefined(deltaCalc)) throw new Error('Loop: must not use "runInterval" in parallel mode (use worker instead)');
    return setInterval((): void => tick$.next(deltaCalc.update()), trigger as number) as unknown as number;
  };

  let intervalId: number | undefined;

  const enableSub$: Subscription = enabled$.pipe(distinctUntilChanged()).subscribe((isEnabled: boolean): void => {
    if (isEnabled) {
      if (isTriggerFn) {
        tick$.next(0);
      } else {
        if (isParallelMode && isDefined(worker)) worker.postMessage({ loopId: id, interval: trigger as number, action: LoopWorkerActions.Start } satisfies TLoopWorkerStartRequestData);
        if (!isParallelMode) intervalId = runInterval();
      }
    } else {
      deltaCalc?.reset();
      if (isParallelMode && isDefined(worker)) worker.postMessage({ action: LoopWorkerActions.Stop } satisfies TLoopWorkerStopRequestData);
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

    if (isDefined(intervalId)) clearInterval(intervalId);

    worker?.terminate();
    worker = null;
    deltaCalc?.destroy();
  });

  return {
    id,
    name,
    tick$,
    type,
    triggerMode: isTriggerFn ? LoopTrigger.Function : LoopTrigger.Interval,
    isParallelMode: isParallelMode ?? false,
    trigger,
    start: (): void => void enabled$.next(true),
    stop: (): void => void enabled$.next(false),
    enabled$,
    shouldUpdateWithPriority,
    ...destroyable
  };
}
