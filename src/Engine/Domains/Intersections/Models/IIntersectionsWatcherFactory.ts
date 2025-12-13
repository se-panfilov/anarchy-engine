import type { IAbstractFactory } from '@Engine/Domains/Abstract';

import type { IIntersectionsParams } from './IIntersectionsParams';
import type { IIntersectionsWatcher } from './IIntersectionsWatcher';

export type IIntersectionsWatcherFactory = IAbstractFactory<IIntersectionsWatcher, IIntersectionsParams>;
