import { MouseClicksWatcher, MousePositionWatcher } from '@Engine/Watchers';

export function startWatchers(): void {
  MouseClicksWatcher().start();
  MousePositionWatcher().start();
}
