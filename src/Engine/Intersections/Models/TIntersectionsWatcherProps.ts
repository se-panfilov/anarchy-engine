import type { IWithName } from '@/Engine/Mixins';

export type TIntersectionsWatcherProps = Readonly<{
  cameraName: string;
  actorNames: ReadonlyArray<string>;
  isAutoStart: boolean;
}> &
  IWithName;
