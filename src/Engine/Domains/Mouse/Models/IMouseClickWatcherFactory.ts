import type { IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';
import type { IMouseClickWatcher } from '@/Engine/Domains/Mouse/Models';

import type { IMouseClickWatcherParams } from './IMouseClickWatcherParams';

export type IMouseClickWatcherFactory = IReactiveFactory<IMouseClickWatcher, IMouseClickWatcherParams> & IDestroyable;
