import { FactoryType, ReactiveFactory } from '@/Abstract';
import type { TMouseClickWatcherFactory } from '@/Mouse/Models';
import { MouseClickWatcher } from '@/Mouse/Watchers';

export const MouseClickWatcherFactory = (): TMouseClickWatcherFactory => ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher);
