import type { IAbstractFactory, IMousePositionWatcherParams } from '@Engine/Models';
import type { IMousePositionWatcher } from '@Engine/Watchers';

export type IMousePositionWatcherFactory = IAbstractFactory<IMousePositionWatcher, IMousePositionWatcherParams>;
