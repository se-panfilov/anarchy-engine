import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Mixins';
import type { IIntersectionsWatcher } from '@Engine/Watchers';

export type IIntersectionsWatcherRegistry = IProtectedRegistry<IIntersectionsWatcher, IAbstractRegistry<IIntersectionsWatcher>>;
