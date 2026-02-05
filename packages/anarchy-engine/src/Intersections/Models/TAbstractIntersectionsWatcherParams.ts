import type { TActor } from '@hellpig/anarchy-engine/Actor';
import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';

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
