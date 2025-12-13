import type { IWithName } from '@/Engine/Mixins';

export type IIntersectionsWatcherProps = Readonly<{
  cameraName: string;
  actorNames: ReadonlyArray<string>;
  isAutoStart: boolean;
}> &
  IWithName;
