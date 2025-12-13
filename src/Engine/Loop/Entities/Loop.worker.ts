import type { TDeltaCalculator } from '@/Engine/Loop/Models';
import type { TMilliseconds } from '@/Engine/Math';
import { isDefined } from '@/Engine/Utils/CheckUtils';

import { DeltaCalculator } from './DeltaCalculator';

const deltaCalc: TDeltaCalculator = DeltaCalculator(false);
let intervalId: number | undefined = undefined;

// TODO 10.0.0. LOOPS: fix any
// eslint-disable-next-line functional/immutable-data
self.onmessage = (event: MessageEvent<any>): void | never => {
  const { action, interval, loopId } = event.data;
  console.log('XXX', event.data);

  switch (action) {
    case 'start':
      intervalId = startLoop(deltaCalc, interval);
      break;
    case 'stop':
      stopLoop(intervalId);
      break;
    default:
      console.warn(`[Worker] Unknown action: ${action}`);
  }
};

function startLoop(deltaCalc: TDeltaCalculator, interval: number): number {
  if (deltaCalc.isPaused) deltaCalc.resume();

  return setInterval((): void => {
    const delta: TMilliseconds = deltaCalc.update();
    self.postMessage({ delta });
  }, interval) as unknown as number;
}

function stopLoop(intervalId: number | undefined): void {
  if (isDefined(intervalId)) clearInterval(intervalId);
  if (!deltaCalc.isPaused) deltaCalc.pause();
}
