import { Clock } from 'three';

import type { TDeltaCalculator } from '@/Loop/Models';
import type { TMilliseconds } from '@/Math';
import { isDefined } from '@/Utils';

export function DeltaCalculator(useClock: boolean = true): TDeltaCalculator {
  let clock: Clock | undefined = useClock ? new Clock() : undefined;

  const result = {
    isPaused: false,
    lastElapsedTime: getLastTime(clock),
    update(): TMilliseconds {
      if (result.isPaused) return 0;

      const now: number = getLastTime(clock);
      const delta: number = (now - result.lastElapsedTime) / 1000;
      // eslint-disable-next-line functional/immutable-data
      result.lastElapsedTime = now as TMilliseconds;

      // Limit the delta to 0.1 seconds (to prevent too big delta)
      return Math.min(delta, 0.1) as TMilliseconds;
    },
    reset(): TMilliseconds {
      // eslint-disable-next-line functional/immutable-data
      result.lastElapsedTime = getLastTime(clock);
      return 0;
    },
    pause(): void {
      // eslint-disable-next-line functional/immutable-data
      result.isPaused = true;
      if (isDefined(clock)) clock.stop();
    },
    resume(): void {
      // eslint-disable-next-line functional/immutable-data
      result.isPaused = false;
      if (isDefined(clock)) clock.start();
      // eslint-disable-next-line functional/immutable-data
      result.lastElapsedTime = getLastTime(clock);
    },
    getClock(): Clock | undefined {
      return clock;
    },
    destroy(): void {
      if (isDefined(clock)) clock.stop();
      clock = undefined;
    }
  };

  return result;
}

const getLastTime = (clock: Clock | undefined): TMilliseconds => ((clock && clock.getElapsedTime() * 1000) || performance.now()) as TMilliseconds;
