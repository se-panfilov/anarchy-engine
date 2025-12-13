import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IIntersectionsParams } from '@Engine/Models';
import type { IIntersectionsWatcher } from '@Engine/Watchers';

export type IIntersectionsWatcherFactory = IAbstractFactory<IIntersectionsWatcher, IIntersectionsParams>;
