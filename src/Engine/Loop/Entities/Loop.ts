import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, EMPTY, filter, Subject, switchMap } from 'rxjs';
import { Clock } from 'three';

import type { TDelta, TDeltaCalculator, TLoop } from '@/Engine/Loop/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

import { DeltaCalculator } from './DeltaCalculator';

export function Loop(triggerFn: (cb: CallableFunction) => void): TLoop {
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const tick$: Subject<TDelta> = new Subject<TDelta>();

  const deltaCalc: TDeltaCalculator = DeltaCalculator(new Clock());

  // TODO 10.0.0. LOOPS: Add stats (for FPS)
  const tickSub$: Subscription = enabled$
    .pipe(switchMap((isEnabled: boolean): Subject<TDelta> | Observable<never> => (isEnabled ? tick$ : EMPTY)))
    .subscribe((): void => triggerFn((): void => tick$.next(deltaCalc.update())));

  const enableSub$: Subscription = enabled$.pipe(filter((isEnabled: boolean): boolean => isEnabled)).subscribe((): void => tick$.next(0));

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
