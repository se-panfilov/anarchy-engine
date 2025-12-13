import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';

export type IIntersectionsWatcherRegistry = IProtectedRegistry<IAbstractEntityRegistry<IIntersectionsWatcher>>;
