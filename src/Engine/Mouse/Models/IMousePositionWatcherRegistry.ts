import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IMousePositionWatcher } from './IMousePositionWatcher';

export type IMousePositionWatcherRegistry = IProtectedRegistry<IAbstractEntityRegistry<IMousePositionWatcher>>;
