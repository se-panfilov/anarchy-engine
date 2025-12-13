import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { WatcherTag } from '@/Engine/Domains/Abstract';

export type IMouseClickWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
