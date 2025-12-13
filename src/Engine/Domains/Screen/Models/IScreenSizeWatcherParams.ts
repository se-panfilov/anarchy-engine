import type { CommonTag, WatcherTag } from '@/Engine/Domains/Abstract';
import type { IGlobalContainerDecorator } from '@/Engine/Domains/Global';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | CommonTag | string>;
}>;
