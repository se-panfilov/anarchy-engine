import type { WatcherTag } from '@/Engine/Abstract';
import type { IGlobalContainerDecorator } from '@/Engine/Global';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type IMousePositionWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
}> &
  IWithReadonlyTags<WatcherTag>;
