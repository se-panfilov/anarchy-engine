import type { IAbstractFactory } from '@Engine/Domains/Abstract';

import type { IMouseClicksWatcher } from './IMouseClicksWatcher';
import type { IMouseClickWatcherParams } from './IMouseClickWatcherParams';

export type IMouseClicksWatcherFactory = IAbstractFactory<IMouseClicksWatcher, IMouseClickWatcherParams>;
