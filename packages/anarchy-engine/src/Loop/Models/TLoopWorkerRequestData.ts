import type { LoopWorkerActions } from '@hellpig/anarchy-engine/Loop/Constants';

export type TLoopWorkerStopRequestData = Readonly<{
  action: LoopWorkerActions;
}>;

export type TLoopWorkerDestroyRequestData = TLoopWorkerStopRequestData &
  Readonly<{
    loopId: string;
  }>;

export type TLoopWorkerStartRequestData = TLoopWorkerStopRequestData &
  Readonly<{
    interval: number;
    loopId: string;
  }>;
