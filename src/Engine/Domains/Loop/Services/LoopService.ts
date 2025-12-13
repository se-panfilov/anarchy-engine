import { Subject } from 'rxjs';
import { Clock } from 'three';

import type { ILoopService, ILoopTimes } from '@/Engine/Domains/Loop/Models';

export function LoopService(): ILoopService {
  const tick$: Subject<ILoopTimes> = new Subject<ILoopTimes>();

  let isLooping: boolean = false;

  const loopFn = getLoopFn(tick$, isLooping);

  function start(): void {
    isLooping = true;
    requestAnimationFrame(loopFn);
  }

  function stop(): void {
    isLooping = false;
  }

  return {
    start,
    stop,
    tick$: tick$.asObservable(),
    getIsLooping: (): boolean => isLooping
  };
}

function getLoopFn(tick$: Subject<ILoopTimes>, isLooping: boolean): (time: number) => void {
  const clock: Clock = new Clock();
  let lastElapsedTime: number = 0;

  function loopFn(frameTime: number): void {
    // (fpsGraph as any).begin();
    if (!isLooping) return;
    const elapsedTime: number = clock.getElapsedTime();
    const delta: number = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;
    tick$.next({ delta, frameTime, elapsedTime });

    // (fpsGraph as any).end();
    requestAnimationFrame(loopFn);
  }

  return loopFn;
}
