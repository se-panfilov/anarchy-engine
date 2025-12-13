import type { TAbstractIntersectionsWatcherConfig } from './TAbstractIntersectionsWatcherConfig';
import type { TIntersectionsCameraWatcherParams } from './TIntersectionsCameraWatcherParams';

export type TIntersectionsCameraWatcherConfig = Omit<TIntersectionsCameraWatcherParams, 'position$' | 'camera' | 'actors' | 'delay' | 'intersectionsLoop'> &
  TAbstractIntersectionsWatcherConfig &
  Readonly<{
    cameraName: string;
  }>;
