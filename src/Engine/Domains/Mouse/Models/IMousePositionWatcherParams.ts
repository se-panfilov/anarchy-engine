import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { CommonTags, WatcherTag } from '@/Engine/Domains/Abstract';

export type IMousePositionWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags: ReadonlyArray<WatcherTag | CommonTags | string>;
}>;
