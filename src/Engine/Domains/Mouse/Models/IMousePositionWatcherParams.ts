import type { WatcherTag } from '@/Engine/Domains/Abstract';
import type { IGlobalContainerDecorator } from '@/Engine/Domains/Global';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type IMousePositionWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
}> &
  IWithReadonlyTags<WatcherTag>;
