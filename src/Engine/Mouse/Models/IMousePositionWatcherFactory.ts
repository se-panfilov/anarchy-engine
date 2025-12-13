import type { IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IMousePositionWatcher } from '@/Engine/Mouse/Models';

import type { IMousePositionWatcherParams } from './IMousePositionWatcherParams';

export type IMousePositionWatcherFactory = IReactiveFactory<IMousePositionWatcher, IMousePositionWatcherParams> & IDestroyable;
