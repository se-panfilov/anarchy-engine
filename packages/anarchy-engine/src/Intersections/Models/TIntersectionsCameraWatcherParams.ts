import type { TAnyCameraWrapper } from '@Anarchy/Engine/Camera';
import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TAbstractIntersectionsWatcherParams } from './TAbstractIntersectionsWatcherParams';

export type TIntersectionsCameraWatcherParams = TAbstractIntersectionsWatcherParams &
  Readonly<{
    position$: Observable<Vector2Like>;
    camera: TAnyCameraWrapper;
    // Fire "undefined" when no intersections (e.g., mouse is just left the object), default is false
    triggerNoIntersections?: boolean;
    // If true, will only fire an event when the intersection is distinct from the previous one.
    // This is useful to avoid duplicate events when the mouse is hovering over the same object.
    // So you just need the fact that it's over an object or not
    isDistinct?: boolean;
  }>;
