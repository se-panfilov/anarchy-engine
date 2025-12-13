import type { TReactiveFactory } from '@/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies } from '@/Mouse/Models';

import type { TMousePositionWatcherParams } from './TMousePositionWatcherParams';

export type TMousePositionWatcherFactory = TReactiveFactory<TMousePositionWatcher, TMousePositionWatcherParams, TMousePositionWatcherDependencies>;
