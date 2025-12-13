import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { IMouseClickWatcher, IMouseClickWatcherFactory, IMouseClickWatcherParams } from '@/Engine/Mouse/Models';
import { MouseClickWatcher } from '@/Engine/Mouse/Watchers';

const factory: TReactiveFactory<IMouseClickWatcher, IMouseClickWatcherParams> = { ...ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher) };
export const MouseClickWatcherFactory = (): IMouseClickWatcherFactory => ({ ...factory });
