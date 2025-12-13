import type { TContainerDecorator } from '@Engine/Global';
import type { TReadonlyVector3 } from '@Engine/ThreeLib';
import type { BehaviorSubject } from 'rxjs';
import type { ColorRepresentation, Vector3Like } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';

export type TIntersectionsDirectionWatcher = TIntersectionsWatcher &
  Readonly<{
    origin$: BehaviorSubject<TReadonlyVector3>;
    direction$: BehaviorSubject<TReadonlyVector3>;
    targetPointToDirection: (origin: Vector3Like, target: Vector3Like) => TReadonlyVector3;
    getDistanceToTargetPoint: (origin: Vector3Like, target: Vector3Like) => number;
    _debugGetRayVisualizationLine: (container: TContainerDecorator, length?: number, color?: ColorRepresentation, lineWidth?: number) => Line2;
  }>;
