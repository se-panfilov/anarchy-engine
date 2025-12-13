import type { WatcherTag } from '@/Engine/Abstract';
import type { TGlobalContainerDecorator } from '@/Engine/Global';

export type TScreenSizeWatcherParams = Readonly<{
  container: TGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
