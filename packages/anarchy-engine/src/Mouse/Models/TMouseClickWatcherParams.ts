import type { WatcherTag } from '@hellpig/anarchy-engine/Abstract';
import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';

export type TMouseClickWatcherParams = Readonly<{
  container: TContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
