import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TMousePositionWatcher } from '@/Engine/Mouse/Models';

import type { TMousePositionWatcherParams } from './TMousePositionWatcherParams';

export type TMousePositionWatcherFactory = TReactiveFactory<TMousePositionWatcher, TMousePositionWatcherParams> & TDestroyable;
