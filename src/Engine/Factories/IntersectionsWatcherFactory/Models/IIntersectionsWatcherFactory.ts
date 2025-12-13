import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IIntersectionsWatcher } from '@Engine/Watchers';

import type { IIntersectionsParams } from '@/Engine/Models';

export type IIntersectionsWatcherFactory = IAbstractFactory<IIntersectionsWatcher, IIntersectionsParams>;
