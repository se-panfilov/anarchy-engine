import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { CommonTags, WatcherTag } from '@/Engine/Domains/Abstract';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | CommonTags | string>;
}>;
