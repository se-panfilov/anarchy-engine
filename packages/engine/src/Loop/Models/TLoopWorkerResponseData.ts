import type { TMilliseconds } from '@/Math';

export type TLoopWorkerResponseData = Readonly<{
  delta: TMilliseconds;
  loopId: string;
}>;
