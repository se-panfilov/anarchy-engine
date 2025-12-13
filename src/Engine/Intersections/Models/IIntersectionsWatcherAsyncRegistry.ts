import type { TAbstractAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';

export type IIntersectionsWatcherAsyncRegistry = TProtectedRegistry<TAbstractAsyncRegistry<TIntersectionsWatcher>>;
