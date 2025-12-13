import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IMousePositionWatcher } from '@/Engine/Domains/Mouse/Models';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IMousePositionWatcherParams } from './IMousePositionWatcherParams';

export type IMousePositionWatcherFactory = IReactiveFactory<IMousePositionWatcher, IMousePositionWatcherParams> & IDestroyable;
