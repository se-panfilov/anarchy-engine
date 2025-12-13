import type { TAnyCameraWrapper } from '@Engine/Camera';
import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TAbstractIntersectionsWatcherParams } from './TAbstractIntersectionsWatcherParams';

export type TIntersectionsCameraWatcherParams = TAbstractIntersectionsWatcherParams &
  Readonly<{
    position$: Observable<Vector2Like>;
    camera: TAnyCameraWrapper;
  }>;
