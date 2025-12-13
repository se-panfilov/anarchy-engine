import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';

export type TIntersectionsWatcherRegistry = TProtectedRegistry<TAbstractEntityRegistry<TIntersectionsWatcher>>;
