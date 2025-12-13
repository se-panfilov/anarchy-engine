import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TWithTags } from '@/Engine/Mixins';

export type TScreenSizeWatcherParams = Readonly<{
  container: TGlobalContainerDecorator;
}> &
  TWithTags;
