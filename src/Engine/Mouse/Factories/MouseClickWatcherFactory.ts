import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TMouseClickWatcher, TMouseClickWatcherFactory, TMouseClickWatcherParams } from '@/Engine/Mouse/Models';
import { MouseClickWatcher } from '@/Engine/Mouse/Watchers';

const factory: TReactiveFactory<TMouseClickWatcher, TMouseClickWatcherParams> = ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher);
// eslint-disable-next-line functional/immutable-data
export const MouseClickWatcherFactory = (): TMouseClickWatcherFactory => Object.assign(factory, {});
