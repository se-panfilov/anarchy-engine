import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';

export type TIntersectionsWatcherRegistry = TProtectedRegistry<TAbstractSimpleRegistry<TIntersectionsWatcher>>;
