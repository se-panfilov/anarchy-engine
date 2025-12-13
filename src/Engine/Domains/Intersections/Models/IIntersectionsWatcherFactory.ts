import type { IFactory } from '@Engine/Domains/Abstract';

import type { IIntersectionsParams } from './IIntersectionsParams';
import type { IIntersectionsWatcher } from './IIntersectionsWatcher';

export type IIntersectionsWatcherFactory = IFactory<IIntersectionsWatcher, IIntersectionsParams>;
