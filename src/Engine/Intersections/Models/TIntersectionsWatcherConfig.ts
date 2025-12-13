import type { TIntersectionsWatcherParams } from './TIntersectionsWatcherParams';

export type TIntersectionsWatcherConfig = Omit<TIntersectionsWatcherParams, 'position$' | 'camera' | 'actors' | 'delay'> &
  Readonly<{
    cameraName: string;
    actorNames: ReadonlyArray<string>;
    isAutoStart: boolean;
  }>;
