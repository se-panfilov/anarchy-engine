import type { TContainerDecorator } from '@/Engine/Global';
import type { TWithTags } from '@/Engine/Mixins';

export type TScreenSizeWatcherParams = Readonly<{
  container: TContainerDecorator;
}> &
  TWithTags;
