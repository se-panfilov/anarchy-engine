import type { Clock } from 'three';

import type { TMilliseconds } from '@/Engine/Math';

export type TDeltaCalculator = Readonly<{
  isPaused: boolean;
  lastElapsedTime: TMilliseconds;
  update: () => TMilliseconds;
  reset: () => TMilliseconds;
  pause: () => void;
  resume: () => void;
  getClock: () => Clock | undefined;
}>;
