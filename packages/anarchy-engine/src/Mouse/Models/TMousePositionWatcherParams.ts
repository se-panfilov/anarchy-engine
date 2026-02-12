import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TWithTags } from '@Anarchy/Engine/Mixins';

import type { TMousePositionPerformanceOptions } from './TMousePositionPerformanceOptions';

export type TMousePositionWatcherParams = Readonly<{
  container: TContainerDecorator;
  performance?: TMousePositionPerformanceOptions;
}> &
  TWithTags;
