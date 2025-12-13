import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TWithReadonlyTags } from '@/Engine/Mixins';

export type TMousePositionWatcherParams = Readonly<{
  container: TGlobalContainerDecorator;
}> &
  TWithReadonlyTags;
