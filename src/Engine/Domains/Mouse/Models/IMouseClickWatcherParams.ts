import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { CommonTag, WatcherTag } from '@/Engine/Domains/Abstract';

export type IMouseClickWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | CommonTag | string>;
}>;
