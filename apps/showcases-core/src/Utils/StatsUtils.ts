import type { TMilliseconds } from '@Anarchy/Engine';
import type { Observable, Subscription } from 'rxjs';
import Stats from 'stats.js';

export function enableFPSCounter(tick$: Observable<TMilliseconds>): Subscription {
  const stats: any = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  return tick$.subscribe((): void => void stats.end());
}
