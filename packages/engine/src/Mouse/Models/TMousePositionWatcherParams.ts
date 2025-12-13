import type { TContainerDecorator } from '@/Global';
import type { TWithTags } from '@/Mixins';

import type { TMousePositionPerformanceOptions } from './TMousePositionPerformanceOptions';

export type TMousePositionWatcherParams = Readonly<{
  container: TContainerDecorator;
  performance?: TMousePositionPerformanceOptions;
}> &
  TWithTags;
