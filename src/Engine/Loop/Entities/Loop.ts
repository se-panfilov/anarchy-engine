import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, EMPTY, Subject, switchMap } from 'rxjs';
import { Clock } from 'three';

import type { TDelta, TDeltaCalculator, TLoop } from '@/Engine/Loop/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

import { DeltaCalculator } from './DeltaCalculator';

type TTriggerFn = ((cb: CallableFunction) => void) | ((cb: FrameRequestCallback) => number);

export function Loop(trigger: TTriggerFn | number): TLoop {
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const tick$: Subject<TDelta> = new Subject<TDelta>();

  // TODO 10.0.0. Does Clock is protected against the slowdown in background tabs? Replace if not.
  const deltaCalc: TDeltaCalculator = DeltaCalculator(new Clock());
  const isTriggerFn: boolean = typeof trigger === 'function';

  // TODO 10.0.0. LOOPS: Add stats (for FPS)
  const tickSub$: Subscription = enabled$
    .pipe(switchMap((isEnabled: boolean): Subject<TDelta> | Observable<never> => (isEnabled && isTriggerFn ? tick$ : EMPTY)))
    .subscribe((): number | void => (trigger as TTriggerFn)((): void => tick$.next(deltaCalc.update())));

  const enableSub$: Subscription = enabled$.subscribe((isEnabled: boolean): void => {
    if (isEnabled) tick$.next(0);
    else deltaCalc.reset();
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

    // TODO DESTROY: destroy deltaCalc
  });

  return {
    tick$: tick$.asObservable(),
    start: (): void => void enabled$.next(true),
    stop: (): void => void enabled$.next(false),
    enabled$,
    ...destroyable
  };
}
