import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IMousePositionWatcher } from './IMousePositionWatcher';

export type IMousePositionWatcherRegistry = IProtectedRegistry<IAbstractEntityRegistry<IMousePositionWatcher>>;
