import { Subject } from 'rxjs';
import { Clock } from 'three';

import type { ILoopService, ILoopTimes } from '@/Engine/Domains/Loop/Models';

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

  return {
    start,
    stop,
    tick$: tick$.asObservable(),
    getIsLooping: (): boolean => state.isLooping
  };
}

function getLoopFn(tick$: Subject<ILoopTimes>, state: ILoopServiceState): (time: number) => void {
  const clock: Clock = new Clock();
  let lastElapsedTime: number = 0;

  function loopFn(frameTime: number): void {
    // (fpsGraph as any).begin();
    if (!state.isLooping) return;
    const elapsedTime: number = clock.getElapsedTime();
    const delta: number = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;
    tick$.next({ delta, frameTime, elapsedTime });

    // (fpsGraph as any).end();
    requestAnimationFrame(loopFn);
  }

  return loopFn;
}
