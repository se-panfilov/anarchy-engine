import type { BehaviorSubject } from 'rxjs';
import type { ColorRepresentation, Vector3Like } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';

import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TAbstractIntersectionsWatcher } from './TAbstractIntersectionsWatcher';

export type TIntersectionsDirectionWatcher = TAbstractIntersectionsWatcher &
  Readonly<{
    origin$: BehaviorSubject<TReadonlyVector3>;
    direction$: BehaviorSubject<TReadonlyVector3>;
    targetPointToDirection: (origin: Vector3Like, target: Vector3Like) => TReadonlyVector3;
    getDistanceToTargetPoint: (origin: Vector3Like, target: Vector3Like) => number;
    _debugGetRayVisualizationLine: (length: number, color: ColorRepresentation, lineWidth: number) => Line2;
  }>;
