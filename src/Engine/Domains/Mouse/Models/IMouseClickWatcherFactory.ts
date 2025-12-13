import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IMouseClickWatcher } from '@/Engine/Domains/Mouse/Models';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IMouseClickWatcherParams } from './IMouseClickWatcherParams';

export type IMouseClickWatcherFactory = IReactiveFactory<IMouseClickWatcher, IMouseClickWatcherParams> & IDestroyable;
