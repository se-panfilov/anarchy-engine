import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IIntersectionsWatcher } from './IIntersectionsWatcher';

export type IIntersectionsWatcherRegistry = IProtectedRegistry<IAbstractRegistry<IIntersectionsWatcher>>;
