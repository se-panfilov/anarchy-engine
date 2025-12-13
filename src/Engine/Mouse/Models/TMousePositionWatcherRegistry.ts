import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TMousePositionWatcher } from './TMousePositionWatcher';

export type TMousePositionWatcherRegistry = TProtectedRegistry<TAbstractEntityRegistry<TMousePositionWatcher>>;
