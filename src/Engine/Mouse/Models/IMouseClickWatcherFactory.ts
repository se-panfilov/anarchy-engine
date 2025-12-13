import type { IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IMouseClickWatcher } from '@/Engine/Mouse/Models';

import type { IMouseClickWatcherParams } from './IMouseClickWatcherParams';

export type IMouseClickWatcherFactory = IReactiveFactory<IMouseClickWatcher, IMouseClickWatcherParams> & IDestroyable;
