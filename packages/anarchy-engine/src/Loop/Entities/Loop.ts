import type { LoopUpdatePriority } from '@Anarchy/Engine/Loop/Constants';
import { LoopTrigger, LoopWorkerActions, MaxTicks } from '@Anarchy/Engine/Loop/Constants';
import type {
  TDelta,
  TDeltaCalculator,
  TLoop,
  TLoopParams,
  TLoopTriggerFn,
  TLoopWorkerDestroyRequestData,
  TLoopWorkerResponseData,
  TLoopWorkerStartRequestData,
  TLoopWorkerStopRequestData
} from '@Anarchy/Engine/Loop/Models';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import { destroyableMixin } from '@Anarchy/Engine/Mixins';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import { nanoid } from 'nanoid';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, EMPTY, Subject, switchMap, takeUntil, takeWhile } from 'rxjs';

import { DeltaCalculator } from './DeltaCalculator';

export function Loop({ name, type, trigger, maxPriority, isParallelMode }: TLoopParams): TLoop | never {
  const id: string = `${nanoid()}_${type}`;
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const tick$: Subject<TDelta> = new Subject<TDelta>();
  let tickCounter: number = 0;

  //An additional variable to make sure that the tick$ is not called after destroy$
  let isDestroyed: boolean = false;

  let worker: Worker | null = null;
  const isTriggerFn: boolean = typeof trigger === 'function';
  if (isParallelMode && isTriggerFn) throw new Error('Loop: Trigger function is not supported in parallel mode, only interval is supported');

  const deltaCalc: TDeltaCalculator | null = isParallelMode ? null : DeltaCalculator(isTriggerFn);

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

  const destroyable: TDestroyable = destroyableMixin();

  enabled$
    .pipe(
      switchMap((isEnabled: boolean): Subject<TDelta> | Observable<never> => (isEnabled && !isParallelMode && isTriggerFn ? tick$ : EMPTY)),
      takeUntil(destroyable.destroy$)
    )
    .subscribe((): number | void => {
      return (trigger as TLoopTriggerFn)((): void => {
        if (!isDestroyed) tick$.next(deltaCalc!.update());
      });
    });

  const runInterval = (): number | never => {
    if (isParallelMode || isNotDefined(deltaCalc)) throw new Error('Loop: must not use "runInterval" in parallel mode (use worker instead)');
    return setInterval((): void => tick$.next(deltaCalc.update()), trigger as number) as unknown as number;
  };

  let intervalId: number | undefined;

  enabled$.pipe(distinctUntilChanged(), takeUntil(destroyable.destroy$)).subscribe((isEnabled: boolean): void => {
    if (isEnabled) {
      if (isTriggerFn) {
        tick$.next(0);
      } else {
        if (isParallelMode && isDefined(worker))
          worker.postMessage({
            loopId: id,
            interval: trigger as number,
            action: LoopWorkerActions.Start
          } satisfies TLoopWorkerStartRequestData);
        if (!isParallelMode) intervalId = runInterval();
      }
    } else {
      deltaCalc?.reset();
      if (isParallelMode && isDefined(worker)) worker.postMessage({ action: LoopWorkerActions.Stop } satisfies TLoopWorkerStopRequestData);
      if (isDefined(intervalId)) clearInterval(intervalId);
    }
  });

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    isDestroyed = true;
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();

    if (isDefined(intervalId)) {
      clearInterval(intervalId);
      intervalId = null as any;
    }

    tickCounter = 0;

    enabled$.next(false);
    enabled$.complete();

    worker?.postMessage({ loopId: id, action: LoopWorkerActions.Destroy } satisfies TLoopWorkerDestroyRequestData);
    worker?.terminate();
    worker = null;
    deltaCalc?.destroy();

    tick$.complete();
  });

  return Object.assign(
    {
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
      shouldUpdateWithPriority
    },
    destroyable
  );
}
