import type { IFactory } from '@Engine/Domains/Abstract';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';

export type IIntersectionsWatcherFactory = IFactory<IIntersectionsWatcher, IIntersectionsWatcherParams>;
