import type { TAbstractIntersectionsWatcher } from './TAbstractIntersectionsWatcher';
import type { TIntersectionsWatcherPerformanceOptions } from './TIntersectionsWatcherPerformanceOptions';

export type TIntersectionsWatcher = TAbstractIntersectionsWatcher &
  Readonly<{
    getPerformanceSettings: () => TIntersectionsWatcherPerformanceOptions;
  }>;
