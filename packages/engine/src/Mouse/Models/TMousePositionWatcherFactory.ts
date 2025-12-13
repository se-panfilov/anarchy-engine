import type { TReactiveFactory } from '@Engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies } from '@Engine/Mouse/Models';

import type { TMousePositionWatcherParams } from './TMousePositionWatcherParams';

export type TMousePositionWatcherFactory = TReactiveFactory<TMousePositionWatcher, TMousePositionWatcherParams, TMousePositionWatcherDependencies>;
