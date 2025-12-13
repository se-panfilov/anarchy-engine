import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IMousePositionWatcherParams } from '@Engine/Domains/Mouse';
import type { IMousePositionWatcher } from '@Engine/Domains/Mouse';

export type IMousePositionWatcherFactory = IAbstractFactory<IMousePositionWatcher, IMousePositionWatcherParams>;
