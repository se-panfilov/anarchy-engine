import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TMouseClickWatcherFactory } from '@Anarchy/Engine/Mouse/Models';
import { MouseClickWatcher } from '@Anarchy/Engine/Mouse/Watchers';

export const MouseClickWatcherFactory = (): TMouseClickWatcherFactory => ReactiveFactory(FactoryType.MouseClickWatcher, MouseClickWatcher);
