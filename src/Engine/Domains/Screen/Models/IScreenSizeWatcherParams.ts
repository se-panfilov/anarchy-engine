import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { WatcherTag } from '@/Engine/Domains/Abstract';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
