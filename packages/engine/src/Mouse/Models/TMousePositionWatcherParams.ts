import type { TContainerDecorator } from '@/Engine/Global';
import type { TWithTags } from '@/Engine/Mixins';

import type { TMousePositionPerformanceOptions } from './TMousePositionPerformanceOptions';

export type TMousePositionWatcherParams = Readonly<{
  container: TContainerDecorator;
  performance?: TMousePositionPerformanceOptions;
}> &
  TWithTags;
