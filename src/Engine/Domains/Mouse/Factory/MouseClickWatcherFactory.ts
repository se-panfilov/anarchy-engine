import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { MouseClickWatcher } from '@/Engine/Domains/Mouse/Watcher';

import type { IMouseClickWatcher, IMouseClickWatcherFactory, IMouseClickWatcherParams } from '../Models';

const factory: IReactiveFactory<IMouseClickWatcher, IMouseClickWatcherParams> = { ...ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher) };
export const MouseClickWatcherFactory = (): IMouseClickWatcherFactory => ({ ...factory });
