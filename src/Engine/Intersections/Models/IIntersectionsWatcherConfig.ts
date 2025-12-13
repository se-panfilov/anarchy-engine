import type { IWithName, IWithReadonlyTags } from '@/Engine/Mixins';

export type IIntersectionsWatcherConfig = Readonly<{
  cameraName: string;
  actorNames: ReadonlyArray<string>;
  isAutoStart: boolean;
}> &
  IWithName &
  IWithReadonlyTags;
