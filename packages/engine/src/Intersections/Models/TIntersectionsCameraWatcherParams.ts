import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TAnyCameraWrapper } from '@/Camera';

import type { TAbstractIntersectionsWatcherParams } from './TAbstractIntersectionsWatcherParams';

export type TIntersectionsCameraWatcherParams = TAbstractIntersectionsWatcherParams &
  Readonly<{
    position$: Observable<Vector2Like>;
    camera: TAnyCameraWrapper;
  }>;
