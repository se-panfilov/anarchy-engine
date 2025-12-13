import type { IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { IMousePositionWatcherWrapper } from '../Models';
import type { IMousePositionWatcherParams } from './IMousePositionWatcherParams';

export type IMousePositionWatcherFactory = IReactiveFactory<IMousePositionWatcherWrapper, IMousePositionWatcherParams> & IDestroyable;
