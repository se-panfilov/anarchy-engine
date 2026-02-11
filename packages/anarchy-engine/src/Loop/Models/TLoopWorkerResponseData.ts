import type { TMilliseconds } from '@Anarchy/Engine/Math';

export type TLoopWorkerResponseData = Readonly<{
  delta: TMilliseconds;
  loopId: string;
}>;
