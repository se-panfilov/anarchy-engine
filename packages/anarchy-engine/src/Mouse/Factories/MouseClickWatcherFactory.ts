import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TMouseClickWatcherFactory } from '@hellpig/anarchy-engine/Mouse/Models';
import { MouseClickWatcher } from '@hellpig/anarchy-engine/Mouse/Watchers';

export const MouseClickWatcherFactory = (): TMouseClickWatcherFactory => ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher);
