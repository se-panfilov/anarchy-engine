import type { IAbstractFactory, IIntersectionsWatcher } from '@/Engine';
import type { IIntersectionsParams } from '@/Engine/Models';

export type IIntersectionsWatcherFactory = IAbstractFactory<IIntersectionsWatcher, IIntersectionsParams>;
