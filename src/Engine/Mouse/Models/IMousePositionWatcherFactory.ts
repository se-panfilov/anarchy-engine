import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { IMousePositionWatcher } from '@/Engine/Mouse/Models';

import type { IMousePositionWatcherParams } from './IMousePositionWatcherParams';

export type IMousePositionWatcherFactory = TReactiveFactory<IMousePositionWatcher, IMousePositionWatcherParams> & TDestroyable;
