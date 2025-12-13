import type { WatcherTag } from '@Engine/Abstract';
import type { TContainerDecorator } from '@Engine/Global';

export type TMouseClickWatcherParams = Readonly<{
  container: TContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
