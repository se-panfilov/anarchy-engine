import type { Clock } from 'three';

import type { TDeltaCalculator } from '@/Engine/Loop/Models';
import type { TMilliseconds } from '@/Engine/Math';

export function DeltaCalculator(clock: Clock): TDeltaCalculator {
  const result = {
    lastElapsedTime: 0 as TMilliseconds,
    update(): TMilliseconds {
      const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;
      const delta: TMilliseconds = (elapsedTime - result.lastElapsedTime) as TMilliseconds;
      // eslint-disable-next-line functional/immutable-data
      result.lastElapsedTime = elapsedTime;

      return delta;
    },
    reset(): void {
      // eslint-disable-next-line functional/immutable-data
      result.lastElapsedTime = 0 as TMilliseconds;
    }
  };

  return result;
}
