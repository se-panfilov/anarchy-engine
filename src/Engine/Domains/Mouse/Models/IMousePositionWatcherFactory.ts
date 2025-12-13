import type { IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';
import type { IMousePositionWatcher } from '@/Engine/Domains/Mouse/Models';

import type { IMousePositionWatcherParams } from './IMousePositionWatcherParams';

export type IMousePositionWatcherFactory = IReactiveFactory<IMousePositionWatcher, IMousePositionWatcherParams> & IDestroyable;
