import type { TLoop } from '@Engine/Loop/Models';
import type { TMilliseconds } from '@Engine/Math';
import type { Observable, Subscription } from 'rxjs';
import Stats from 'stats.js';

// TODO 18-0-0: MONO: move to apps/showcase (and move stats.js there)
export function enableFPSCounter(tick$: Observable<TMilliseconds>): Subscription {
  // TODO DEBUG: make stats enable/disable configurable via url params (?debug=true)
  const stats: any = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  return tick$.subscribe((): void => void stats.end());
}

//calculate tick rate (useful to compare the same tick rate in the main stream and in the worker, cause in worker could be a way faster, and in the main stream could be slowed down by the browser)
export function testTickRate(loop: TLoop, durationMs: number = 3000): void {
  let tickCount: number = 0;

  const subscription: Subscription = loop.tick$.subscribe((): number => tickCount++);

  setTimeout((): void => {
    subscription.unsubscribe();
    console.log(`Loop "${loop.name}" called tick$.next() ${tickCount} times in ${durationMs / 1000} seconds.`);
  }, durationMs);
}
