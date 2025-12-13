import type { WatcherTag } from '@/Engine/Abstract';
import type { TGlobalContainerDecorator } from '@/Engine/Global';

export type TMouseClickWatcherParams = Readonly<{
  container: TGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
