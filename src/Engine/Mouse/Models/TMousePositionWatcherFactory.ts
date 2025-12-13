import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies } from '@/Engine/Mouse/Models';

import type { TMousePositionWatcherParams } from './TMousePositionWatcherParams';

export type TMousePositionWatcherFactory = TReactiveFactoryWithDependencies<TMousePositionWatcher, TMousePositionWatcherParams, TMousePositionWatcherDependencies> & TDestroyable;
