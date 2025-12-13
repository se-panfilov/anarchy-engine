import type { WatcherTag } from '@/Abstract';
import type { TContainerDecorator } from '@/Global';

export type TMouseClickWatcherParams = Readonly<{
  container: TContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
