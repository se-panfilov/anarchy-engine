import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { IMouseClickWatcher } from '@/Engine/Mouse/Models';

import type { IMouseClickWatcherParams } from './IMouseClickWatcherParams';

export type IMouseClickWatcherFactory = TReactiveFactory<IMouseClickWatcher, IMouseClickWatcherParams> & TDestroyable;
