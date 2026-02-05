import type { TMilliseconds } from '@hellpig/anarchy-engine/Math';

export type TLoopWorkerResponseData = Readonly<{
  delta: TMilliseconds;
  loopId: string;
}>;
