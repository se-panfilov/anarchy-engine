import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IIntersectionsWatcher } from '@Engine/Domains/Intersections';
import type { IProtectedRegistry } from '@Engine/Mixins';

export type IIntersectionsWatcherRegistry = IProtectedRegistry<IIntersectionsWatcher, IAbstractRegistry<IIntersectionsWatcher>>;
