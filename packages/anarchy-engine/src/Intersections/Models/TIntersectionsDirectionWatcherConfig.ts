import type { Vector3Like } from 'three';

import type { TAbstractIntersectionsWatcherConfig } from './TAbstractIntersectionsWatcherConfig';
import type { TIntersectionsDirectionWatcherParams } from './TIntersectionsDirectionWatcherParams';

export type TIntersectionsDirectionWatcherConfig = Omit<TIntersectionsDirectionWatcherParams, 'position$' | 'origin' | 'direction' | 'actors' | 'delay' | 'intersectionsLoop'> &
  TAbstractIntersectionsWatcherConfig &
  Readonly<{
    origin: Vector3Like;
    direction: Vector3Like;
  }>;
