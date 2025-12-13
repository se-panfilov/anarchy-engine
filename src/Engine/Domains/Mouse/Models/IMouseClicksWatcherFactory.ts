import type { IFactory } from '@Engine/Domains/Abstract';

import type { IMouseClicksWatcher } from './IMouseClicksWatcher';
import type { IMouseClicksWatcherRegistry } from './IMouseClicksWatcherRegistry';
import type { IMouseClickWatcherParams } from './IMouseClickWatcherParams';

export type IMouseClicksWatcherFactory = IFactory<IMouseClicksWatcher, IMouseClickWatcherParams> & IMouseClicksWatcherRegistry;
