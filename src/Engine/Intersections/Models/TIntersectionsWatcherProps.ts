import type { TWithName } from '@/Engine/Mixins';

export type TIntersectionsWatcherProps = Readonly<{
  cameraName: string;
  actorNames: ReadonlyArray<string>;
  isAutoStart: boolean;
}> &
  TWithName;
