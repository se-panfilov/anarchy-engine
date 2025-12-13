import type { Subscription } from 'rxjs';
import { Subject, tap } from 'rxjs';
import Stats from 'stats.js';
import { Clock } from 'three';

import type { TDelta, TLoopService } from '@/Engine/Loop/Models';
import type { TMilliseconds } from '@/Engine/Math/Types';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

type TLoopServiceState = { isLooping: boolean };

export function LoopService(): TLoopService {
  const tick$: Subject<TDelta> = new Subject<TDelta>();
  const beforeTick$: Subject<TDelta> = new Subject<TDelta>();
  const state: TLoopServiceState = {
    isLooping: false
  };

  let beforeTick: ((times: TDelta) => void) | undefined = undefined;
  const setBeforeEveryTick = (fn: (times: TDelta) => void): void => void (beforeTick = fn);

  beforeTick$
    .pipe(
      tap((times: TDelta) => {
        if (isDefined(beforeTick)) beforeTick(times);
      })
    )
    .subscribe((times: TDelta): void => tick$.next(times));

  const loopFn = getLoopFn(beforeTick$, state);

  // const loopFn = getLoopFn(tick$, state);

  function start(): void {
    // eslint-disable-next-line functional/immutable-data
    state.isLooping = true;
    requestAnimationFrame(loopFn);
  }

  function stop(): void {
    // eslint-disable-next-line functional/immutable-data
    state.isLooping = false;
  }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    beforeTick$.complete();
    beforeTick$.unsubscribe();
    tick$.complete();
    tick$.unsubscribe();
  });

  return {
    start,
    stop,
    setBeforeEveryTick,
    tick$: tick$.asObservable(),
    isLooping: (): boolean => state.isLooping,
    ...destroyable
  };
}

function getLoopFn(beforeTick$: Subject<TDelta>, state: TLoopServiceState): (time: number) => void {
  const clock: Clock = new Clock();
  let lastElapsedTime: TMilliseconds = 0 as TMilliseconds;

  // TODO DEBUG: make stats enable/disable configurable via url params (?debug=true)
  const stats: any = new Stats();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  document.body.appendChild(stats.dom);

  function loopFn(): void {
    // stats.begin();
    if (!state.isLooping) return;
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
    const delta: TMilliseconds = (elapsedTime - lastElapsedTime) as TMilliseconds;
    lastElapsedTime = elapsedTime;
    beforeTick$.next(delta);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    stats.end();
    requestAnimationFrame(loopFn);
  }

  return loopFn;
}
