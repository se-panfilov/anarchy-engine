import type { TAbstractIntersectionsWatcherParams } from './TAbstractIntersectionsWatcherParams';

export type TAbstractIntersectionsWatcherConfig = Omit<TAbstractIntersectionsWatcherParams, 'actors' | 'delay' | 'intersectionsLoop'> &
  Readonly<{
    actorNames: ReadonlyArray<string>;
    isAutoStart: boolean;
    intersectionsLoop?: string;
  }>;
