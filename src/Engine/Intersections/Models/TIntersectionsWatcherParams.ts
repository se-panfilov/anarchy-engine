import type { TAbstractIntersectionsWatcherConfig } from './TAbstractIntersectionsWatcherConfig';
import type { TIntersectionsWatcherPerformanceOptions } from './TIntersectionsWatcherPerformanceOptions';

export type TIntersectionsWatcherParams = TAbstractIntersectionsWatcherConfig &
  Readonly<{
    performance: TIntersectionsWatcherPerformanceOptions;
  }>;
