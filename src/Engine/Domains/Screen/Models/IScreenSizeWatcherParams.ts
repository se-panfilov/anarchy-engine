import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { WatcherTags } from '@/Engine/Domains/Abstract';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTags | string>;
}>;
