import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';

import type { IIntersectionsWatcher } from '@/Engine/Watchers';

export type IIntersectionsWatcherRegistry = IProtectedRegistry<IIntersectionsWatcher, IAbstractRegistry<IIntersectionsWatcher>>;
