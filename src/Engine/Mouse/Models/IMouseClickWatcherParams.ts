import type { WatcherTag } from '@/Engine/Abstract';
import type { TGlobalContainerDecorator } from '@/Engine/Global';

export type IMouseClickWatcherParams = Readonly<{
  container: TGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
