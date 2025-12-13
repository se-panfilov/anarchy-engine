import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { IMouseClickWatcher, IMouseClickWatcherFactory, IMouseClickWatcherParams } from '@/Engine/Mouse/Models';
import { MouseClickWatcher } from 'src/Engine/Mouse/Watchers';

const factory: IReactiveFactory<IMouseClickWatcher, IMouseClickWatcherParams> = { ...ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher) };
export const MouseClickWatcherFactory = (): IMouseClickWatcherFactory => ({ ...factory });
