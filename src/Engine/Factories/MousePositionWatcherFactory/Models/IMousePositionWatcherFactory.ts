import type { IAbstractFactory, IMousePositionWatcher, IMousePositionWatcherParams } from '@/Engine';

export type IMousePositionWatcherFactory = IAbstractFactory<IMousePositionWatcher, IMousePositionWatcherParams>;
