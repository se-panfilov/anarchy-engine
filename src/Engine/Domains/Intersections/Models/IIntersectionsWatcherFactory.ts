import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IIntersectionsWatcher } from '@Engine/Domains/Intersections';
import type { IIntersectionsParams } from '@Engine/Models';

export type IIntersectionsWatcherFactory = IAbstractFactory<IIntersectionsWatcher, IIntersectionsParams>;
