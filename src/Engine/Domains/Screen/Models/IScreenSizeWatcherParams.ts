import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { CommonTag, WatcherTag } from '@/Engine/Domains/Abstract';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | CommonTag | string>;
}>;
