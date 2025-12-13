import type { IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IIntersectionsWatcher } from './IIntersectionsWatcher';
import type { IIntersectionsWatcherParams } from './IIntersectionsWatcherParams';

export type IIntersectionsWatcherFactory = IReactiveFactory<IIntersectionsWatcher, IIntersectionsWatcherParams> & IDestroyable;
