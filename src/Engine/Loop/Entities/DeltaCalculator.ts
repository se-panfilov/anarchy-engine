import type { Clock } from 'three';

import type { TDeltaCalculator } from '@/Engine/Loop/Models';
import type { TMilliseconds } from '@/Engine/Math';

export function DeltaCalculator(clock: Clock): TDeltaCalculator {
  const result = {
    isPaused: false,
    lastElapsedTime: 0 as TMilliseconds,
    update(): TMilliseconds {
      if (result.isPaused) return 0;
      const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
      const delta: TMilliseconds = (elapsedTime - result.lastElapsedTime) as TMilliseconds;
      // eslint-disable-next-line functional/immutable-data
      result.lastElapsedTime = elapsedTime;

      return Math.min(delta, 0.1) as TMilliseconds;
    },
    reset(): number {
      // eslint-disable-next-line functional/immutable-data
      result.lastElapsedTime = 0 as TMilliseconds;
      return 0;
    },
    pause(): void {
      // eslint-disable-next-line functional/immutable-data
      result.isPaused = true;
      clock.stop();
    },
    resume(): void {
      // eslint-disable-next-line functional/immutable-data
      result.isPaused = false;
      clock.start();
      // eslint-disable-next-line functional/immutable-data
      result.lastElapsedTime = clock.getElapsedTime() as TMilliseconds;
    }
  };

  return result;
}
