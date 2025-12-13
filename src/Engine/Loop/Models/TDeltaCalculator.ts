import type { TMilliseconds } from '@/Engine/Math';

export type TDeltaCalculator = Readonly<{
  isPaused: boolean;
  lastElapsedTime: TMilliseconds;
  update: () => TMilliseconds;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}>;
