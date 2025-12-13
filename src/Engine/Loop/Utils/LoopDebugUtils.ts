import type { Observable, Subscription } from 'rxjs';
import Stats from 'stats.js';

import type { TMilliseconds } from '@/Engine/Math';

export function enableFPSCounter(tick$: Observable<TMilliseconds>): Subscription {
  // TODO DEBUG: make stats enable/disable configurable via url params (?debug=true)
  const stats: any = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  return tick$.subscribe((): void => void stats.end());
}
