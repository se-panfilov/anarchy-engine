import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import type { IMouseClickWatcher, IMouseClickWatcherFactory, IMouseClickWatcherParams } from '@/Engine/Domains/Mouse/Models';
import { MouseClickWatcher } from '@/Engine/Domains/Mouse/Watcher';

const factory: IReactiveFactory<IMouseClickWatcher, IMouseClickWatcherParams> = { ...ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher) };
export const MouseClickWatcherFactory = (): IMouseClickWatcherFactory => ({ ...factory });
