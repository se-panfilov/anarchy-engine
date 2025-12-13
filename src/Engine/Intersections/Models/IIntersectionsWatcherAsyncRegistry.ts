import type { IAbstractAsyncRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';

export type IIntersectionsWatcherAsyncRegistry = IProtectedRegistry<IAbstractAsyncRegistry<IIntersectionsWatcher>>;
