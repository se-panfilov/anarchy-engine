import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TActor } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TWithName, TWithTags } from '@/Engine/Mixins';

import type { TIntersectionsLoop } from './TIntersectionsLoop';
import type { TIntersectionsWatcherPerformanceOptions } from './TIntersectionsWatcherPerformanceOptions';

export type TIntersectionsWatcherParams = Readonly<{
  isAutoStart: boolean;
  camera: TCameraWrapper;
  actors: ReadonlyArray<TActor>;
  position$: Observable<Vector2Like>;
  intersectionsLoop: TIntersectionsLoop;
  performance?: TIntersectionsWatcherPerformanceOptions;
}> &
  TWithName &
  TWithTags;
