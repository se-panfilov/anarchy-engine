import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TWithTags } from '@/Engine/Mixins';

import type { TMousePositionPerformanceOptions } from './TMousePositionPerformanceOptions';

export type TMousePositionWatcherParams = Readonly<{
  container: TGlobalContainerDecorator;
  performance?: TMousePositionPerformanceOptions;
}> &
  TWithTags;
