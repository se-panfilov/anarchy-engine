import type { TIntersectionsCameraWatcherParams } from './TIntersectionsCameraWatcherParams';

export type TIntersectionsCameraWatcherConfig = Omit<TIntersectionsCameraWatcherParams, 'position$' | 'camera' | 'actors' | 'delay' | 'intersectionsLoop'> &
  Readonly<{
    cameraName: string;
    actorNames: ReadonlyArray<string>;
    isAutoStart: boolean;
    intersectionsLoop?: string;
  }>;
