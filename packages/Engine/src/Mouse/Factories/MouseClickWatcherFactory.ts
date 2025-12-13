import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TMouseClickWatcherFactory } from '@/Engine/Mouse/Models';
import { MouseClickWatcher } from '@/Engine/Mouse/Watchers';

export const MouseClickWatcherFactory = (): TMouseClickWatcherFactory => ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher);
