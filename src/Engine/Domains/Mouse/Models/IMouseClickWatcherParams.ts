import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { WatcherTags } from '@/Engine/Domains/Abstract';

export type IMouseClickWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<WatcherTags | string>;
}>;
