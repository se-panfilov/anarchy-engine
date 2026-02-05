import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies } from '@hellpig/anarchy-engine/Mouse/Models';

import type { TMousePositionWatcherParams } from './TMousePositionWatcherParams';

export type TMousePositionWatcherFactory = TReactiveFactory<TMousePositionWatcher, TMousePositionWatcherParams, TMousePositionWatcherDependencies>;
