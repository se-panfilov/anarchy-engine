import type { TMilliseconds } from '@Engine/Math';

export type TLoopWorkerResponseData = Readonly<{
  delta: TMilliseconds;
  loopId: string;
}>;
