import type { IAbstractFactory, IMouseClickWatcherParams } from '@Engine/Models';
import type { IMouseClicksWatcher } from '@Engine/Watchers';

export type IMouseClicksWatcherFactory = IAbstractFactory<IMouseClicksWatcher, IMouseClickWatcherParams>;
