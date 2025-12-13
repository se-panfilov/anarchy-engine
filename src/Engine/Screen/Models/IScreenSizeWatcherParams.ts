import type { CommonTag, WatcherTag } from '@/Engine/Abstract';
import type { IGlobalContainerDecorator } from '@/Engine/Global';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | CommonTag | string>;
}>;
