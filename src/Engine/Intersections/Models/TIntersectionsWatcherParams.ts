import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TActor } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TIntersectionsWatcherPerformanceOptions } from './TIntersectionsWatcherPerformanceOptions';
import type { TIntersectionsWatcherProps } from './TIntersectionsWatcherProps';

export type TIntersectionsWatcherParams = Omit<TIntersectionsWatcherProps, 'cameraName' | 'actorNames'> &
  Readonly<{
    camera: TCameraWrapper;
    actors: ReadonlyArray<TActor>;
    position$: Observable<Vector2Like>;
    delay?: number;
    noiseThreshold?: number;
    performance?: TIntersectionsWatcherPerformanceOptions;
  }> &
  TWithReadonlyTags;
