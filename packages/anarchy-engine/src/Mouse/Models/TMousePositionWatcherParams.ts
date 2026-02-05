import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import type { TWithTags } from '@hellpig/anarchy-engine/Mixins';

import type { TMousePositionPerformanceOptions } from './TMousePositionPerformanceOptions';

export type TMousePositionWatcherParams = Readonly<{
  container: TContainerDecorator;
  performance?: TMousePositionPerformanceOptions;
}> &
  TWithTags;
