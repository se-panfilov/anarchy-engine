import type { Vector3Like } from 'three';

import type { TIntersectionsDirectionWatcherParams } from './TIntersectionsDirectionWatcherParams';

export type TIntersectionsDirectionWatcherConfig = Omit<TIntersectionsDirectionWatcherParams, 'position$' | 'origin' | 'direction' | 'actors' | 'delay' | 'intersectionsLoop'> &
  Readonly<{
    origin: Vector3Like;
    direction: Vector3Like;
    actorNames: ReadonlyArray<string>;
    isAutoStart: boolean;
    intersectionsLoop?: string;
  }>;
