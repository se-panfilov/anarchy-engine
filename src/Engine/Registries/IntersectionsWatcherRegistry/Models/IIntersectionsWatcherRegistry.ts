import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Models';
import type { IIntersectionsWatcher } from '@Engine/Watchers';

export type IIntersectionsWatcherRegistry = IProtectedRegistry<IIntersectionsWatcher, IAbstractRegistry<IIntersectionsWatcher>>;
