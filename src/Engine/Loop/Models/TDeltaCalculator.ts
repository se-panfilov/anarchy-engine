import type { TMilliseconds } from '@/Engine/Math';

export type TDeltaCalculator = Readonly<{
  lastElapsedTime: TMilliseconds;
  update: () => TMilliseconds;
  reset: () => void;
}>;
