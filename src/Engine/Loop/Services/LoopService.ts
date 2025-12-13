import { Subject } from 'rxjs';
import { Clock } from 'three';

import type { ILoopService, ILoopTimes } from '@/Engine/Loop/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

type ILoopServiceState = { isLooping: boolean };

export function LoopService(): ILoopService {
  const tick$: Subject<ILoopTimes> = new Subject<ILoopTimes>();
  const state: ILoopServiceState = {
    isLooping: false
  };

  const loopFn = getLoopFn(tick$, state);

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
  destroyable.destroyed$.subscribe((): void => tick$.complete());

  return {
    start,
    stop,
    tick$: tick$.asObservable(),
    getIsLooping: (): boolean => state.isLooping,
    ...destroyable
  };
}

function getLoopFn(tick$: Subject<ILoopTimes>, state: ILoopServiceState): (time: number) => void {
  const clock: Clock = new Clock();
  let lastElapsedTime: number = 0;

  function loopFn(frameTime: number): void {
    // (fpsGraph as any).begin();
    if (!state.isLooping) return;
    const elapsedTime: number = clock.getElapsedTime();
    // TODO (S.Panfilov) MATH: need precision calculations??? (or not? how performant they are?)
    const delta: number = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;
    tick$.next({ delta, frameTime, elapsedTime });

    // (fpsGraph as any).end();
    requestAnimationFrame(loopFn);
  }

  return loopFn;
}
