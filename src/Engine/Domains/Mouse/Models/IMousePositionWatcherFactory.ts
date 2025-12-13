import type { IAbstractFactory } from '@Engine/Domains/Abstract';

import type { IMousePositionWatcher } from './IMousePositionWatcher';
import type { IMousePositionWatcherParams } from './IMousePositionWatcherParams';

export type IMousePositionWatcherFactory = IAbstractFactory<IMousePositionWatcher, IMousePositionWatcherParams>;
