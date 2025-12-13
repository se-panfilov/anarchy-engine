import type { TLoop } from '@Engine/Loop/Models';
import type { Subscription } from 'rxjs';

//calculate tick rate (useful to compare the same tick rate in the main stream and in the worker, cause in worker could be a way faster, and in the main stream could be slowed down by the browser)
export function testTickRate(loop: TLoop, durationMs: number = 3000): void {
  let tickCount: number = 0;

  const subscription: Subscription = loop.tick$.subscribe((): number => tickCount++);

  setTimeout((): void => {
    subscription.unsubscribe();
    console.log(`Loop "${loop.name}" called tick$.next() ${tickCount} times in ${durationMs / 1000} seconds.`);
  }, durationMs);
}
