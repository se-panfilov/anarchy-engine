import { LoopWorkerActions } from '@/Engine/Loop/Constants';
import type { TDeltaCalculator, TLoopWorkerResponseData, TLoopWorkerStartRequestData, TLoopWorkerStopRequestData } from '@/Engine/Loop/Models';
import type { TMilliseconds } from '@/Engine/Math';
import { isDefined } from '@/Engine/Utils/CheckUtils';

import { DeltaCalculator } from './DeltaCalculator';

const deltaCalc: TDeltaCalculator = DeltaCalculator(false);
let intervalId: number | undefined = undefined;

// eslint-disable-next-line functional/immutable-data
self.onmessage = (event: MessageEvent<TLoopWorkerStopRequestData | TLoopWorkerStartRequestData>): void | never => {
  const { action, interval, loopId } = event.data as TLoopWorkerStartRequestData;

  switch (action) {
    case LoopWorkerActions.Start:
      intervalId = startLoop(deltaCalc, interval, loopId);
      break;
    case LoopWorkerActions.Stop:
      stopLoop(intervalId);
      break;
    default:
      console.warn(`[Worker] Unknown action: ${action}`);
  }
};

function startLoop(deltaCalc: TDeltaCalculator, interval: number, loopId: string): number {
  if (deltaCalc.isPaused) deltaCalc.resume();

  return setInterval((): void => {
    const delta: TMilliseconds = deltaCalc.update();
    self.postMessage({ delta, loopId } satisfies TLoopWorkerResponseData);
  }, interval) as unknown as number;
}

function stopLoop(intervalId: number | undefined): void {
  if (isDefined(intervalId)) clearInterval(intervalId);
  if (!deltaCalc.isPaused) deltaCalc.pause();
}
