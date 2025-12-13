import type { TAnyCameraWrapper } from '@Engine/Camera';
import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TAbstractIntersectionsWatcherParams } from './TAbstractIntersectionsWatcherParams';

export type TIntersectionsCameraWatcherParams = TAbstractIntersectionsWatcherParams &
  Readonly<{
    position$: Observable<Vector2Like>;
    camera: TAnyCameraWrapper;
    // Fire "undefined" when no intersections (e.g., mouse is just left the object), default is false
    triggerNoIntersections?: boolean;
  }>;
