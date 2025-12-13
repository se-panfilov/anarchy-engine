import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IMousePositionWatcherParams } from '@Engine/Models';
import type { IMousePositionWatcher } from '@Engine/Watchers';

export type IMousePositionWatcherFactory = IAbstractFactory<IMousePositionWatcher, IMousePositionWatcherParams>;
