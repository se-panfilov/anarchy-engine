import type { IFactory } from '@Engine/Domains/Abstract';

import type { IMousePositionWatcher } from './IMousePositionWatcher';
import type { IMousePositionWatcherParams } from './IMousePositionWatcherParams';
import type { IMousePositionWatcherRegistry } from './IMousePositionWatcherRegistry';

export type IMousePositionWatcherFactory = IFactory<IMousePositionWatcher, IMousePositionWatcherParams> & IMousePositionWatcherRegistry;
