import type { TActor } from '@/Actor';
import type { TWithName, TWithTags } from '@/Mixins';

import type { TIntersectionsLoop } from './TIntersectionsLoop';
import type { TIntersectionsWatcherPerformanceOptions } from './TIntersectionsWatcherPerformanceOptions';

export type TAbstractIntersectionsWatcherParams = Readonly<{
  isAutoStart: boolean;
  actors: ReadonlyArray<TActor>;
  intersectionsLoop: TIntersectionsLoop;
  performance?: TIntersectionsWatcherPerformanceOptions;
  far?: number;
}> &
  TWithName &
  TWithTags;
