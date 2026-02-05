import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import type { TMilliseconds } from '@hellpig/anarchy-engine/Math';
import { isDefined } from '@hellpig/anarchy-shared/Utils';

export function waitForCanvasGetSize(container: TContainerDecorator, timeoutMs: TMilliseconds = 10_000 as TMilliseconds): Promise<void> {
  return new Promise((resolve, reject): void => {
    const start: number = performance.now();

    const check = (): void => {
      const canvas: HTMLCanvasElement | undefined = container.canvas$.value;
      const elapsed: number = performance.now() - start;

      if (isDefined(canvas) && canvas.clientWidth > 0 && canvas.clientHeight > 0) {
        resolve();
      } else if (elapsed > timeoutMs) {
        reject(new Error(`[SPACE]: Canvas size remains 0 after ${timeoutMs}ms.`));
      } else {
        requestAnimationFrame(check);
      }
    };

    check();
  });
}

export const nextAnimationFrame = (): Promise<unknown> => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
