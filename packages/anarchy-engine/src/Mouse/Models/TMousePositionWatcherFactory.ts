import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies } from '@Anarchy/Engine/Mouse/Models';

import type { TMousePositionWatcherParams } from './TMousePositionWatcherParams';

export type TMousePositionWatcherFactory = TReactiveFactory<TMousePositionWatcher, TMousePositionWatcherParams, TMousePositionWatcherDependencies>;
