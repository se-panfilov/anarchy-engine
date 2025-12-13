import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IMouseClickWatcherParams } from '@Engine/Models';
import type { IMouseClicksWatcher } from '@Engine/Watchers';

export type IMouseClicksWatcherFactory = IAbstractFactory<IMouseClicksWatcher, IMouseClickWatcherParams>;
