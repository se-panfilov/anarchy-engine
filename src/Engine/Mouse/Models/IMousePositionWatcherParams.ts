import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TWithReadonlyTags } from '@/Engine/Mixins';

export type IMousePositionWatcherParams = Readonly<{
  container: TGlobalContainerDecorator;
}> &
  TWithReadonlyTags;
