import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TMousePositionPerformanceOptions } from './TMousePositionPerformanceOptions';

export type TMousePositionWatcherParams = Readonly<{
  container: TGlobalContainerDecorator;
  performance?: TMousePositionPerformanceOptions;
}> &
  TWithReadonlyTags;
